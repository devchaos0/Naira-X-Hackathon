import { CreateCrowdFundForm, CrowdFundItem } from "@/api/type";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import AcceptCrowdFundModal from "../component/crowdfund/AcceptCrowdFundModal";
import CreateCrowdFundModal from "../component/crowdfund/CreateCrowdFundModal";
import CrowdFundCard from "../component/crowdfund/CrowdFundCard";
import CrowdFundTabs from "../component/crowdfund/CrowdFundTabs";
import FloatingActionButton from "../component/crowdfund/FloatingActionButton";

const MOCK_CROWDFUNDS: CrowdFundItem[] = [
  {
    id: "1",
    name: "Community Garden Project",
    details: "Building a community garden in the neighborhood",
    duration: "30 days",
    targetAmount: 5000,
    raisedAmount: 3200,
    code: "CF-2024-001",
    createdAt: "2024-01-15",
    creatorId: "user1",
  },
  {
    id: "2",
    name: "School Supplies Drive",
    details: "Providing school supplies to underprivileged students",
    duration: "15 days",
    targetAmount: 2500,
    raisedAmount: 1800,
    code: "CF-2024-002",
    createdAt: "2024-01-20",
    creatorId: "user1",
  },
  {
    id: "3",
    name: "Tech for Education",
    details: "Providing laptops to students in need",
    duration: "45 days",
    targetAmount: 10000,
    raisedAmount: 4500,
    code: "CF-2024-003",
    createdAt: "2024-01-25",
    creatorId: "user2",
  },
];

export default function CrowdFund() {
  const [activeTab, setActiveTab] = useState<"my" | "all">("my");
  const [crowdfunds, setCrowdfunds] =
    useState<CrowdFundItem[]>(MOCK_CROWDFUNDS);
  const [showFloatingOptions, setShowFloatingOptions] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const router = useRouter();

  // Create form states
  const [createForm, setCreateForm] = useState<CreateCrowdFundForm>({
    name: "",
    details: "",
    duration: "",
    amount: "",
  });

  // Accept form states
  const [acceptCode, setAcceptCode] = useState("");

  // Generate a random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle create crowd fund
  const handleCreateCrowdfund = () => {
    if (
      !createForm.name ||
      !createForm.details ||
      !createForm.duration ||
      !createForm.amount
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newCrowdfund: CrowdFundItem = {
      id: Date.now().toString(),
      name: createForm.name,
      details: createForm.details,
      duration: createForm.duration,
      targetAmount: parseFloat(createForm.amount),
      raisedAmount: 0,
      code: generateCode(),
      createdAt: new Date().toISOString().split("T")[0],
      creatorId: "user1",
    };

    setCrowdfunds([newCrowdfund, ...crowdfunds]);
    setShowCreateModal(false);
    setCreateForm({ name: "", details: "", duration: "", amount: "" });
    setShowFloatingOptions(false);
    Alert.alert("Success", "Crowd fund created successfully!");
  };

  // Handle accept crowd fund
  const navigateToCrowdFundDetail = (crowdFund: CrowdFundItem) => {
    router.push({
      pathname: "/crowdfund/CrowdFundDetail",
      params: {
        name: crowdFund.name,
        details: crowdFund.details,
        duration: crowdFund.duration,
        targetAmount: String(crowdFund.targetAmount),
        raisedAmount: String(crowdFund.raisedAmount),
        code: crowdFund.code,
        createdAt: crowdFund.createdAt,
      },
    });
  };

  const handleAcceptCrowdfund = () => {
    if (!acceptCode.trim()) {
      Alert.alert("Error", "Please enter a crowd fund code");
      return;
    }

    const found = crowdfunds.find((item) => item.code === acceptCode.trim());
    if (found) {
      setShowAcceptModal(false);
      setAcceptCode("");
      setShowFloatingOptions(false);
      navigateToCrowdFundDetail(found);
    } else {
      Alert.alert("Error", "Invalid crowd fund code. Please try again.");
    }
  };

  const myCrowdfunds = crowdfunds.filter((item) => item.creatorId === "user1");
  const allCrowdfunds = crowdfunds;
  const displayedCrowdfunds = activeTab === "my" ? myCrowdfunds : allCrowdfunds;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <CrowdFundTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        myCount={myCrowdfunds.length}
        allCount={allCrowdfunds.length}
      />

      <FlatList
        data={displayedCrowdfunds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CrowdFundCard
            item={item}
            onPress={(crowdFund) => navigateToCrowdFundDetail(crowdFund)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CustomText variant="h6" style={styles.emptyText}>
              {activeTab === "my"
                ? "You haven't created any crowd funds yet"
                : "No crowd funds available"}
            </CustomText>
          </View>
        }
      />

      <FloatingActionButton
        isOpen={showFloatingOptions}
        onToggle={() => setShowFloatingOptions(!showFloatingOptions)}
        onCreatePress={() => {
          setShowCreateModal(true);
          setShowFloatingOptions(false);
        }}
        onAcceptPress={() => {
          setShowAcceptModal(true);
          setShowFloatingOptions(false);
        }}
      />

      <CreateCrowdFundModal
        visible={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setCreateForm({ name: "", details: "", duration: "", amount: "" });
        }}
        onSubmit={handleCreateCrowdfund}
        form={createForm}
        setForm={setCreateForm}
      />

      <AcceptCrowdFundModal
        visible={showAcceptModal}
        onClose={() => {
          setShowAcceptModal(false);
          setAcceptCode("");
        }}
        onSubmit={handleAcceptCrowdfund}
        code={acceptCode}
        setCode={setAcceptCode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: Colors.light.text2,
    textAlign: "center",
  },
});

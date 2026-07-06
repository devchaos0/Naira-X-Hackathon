import {
  createFund,
  getMyAjoFunds,
  getPublicAjoFunds,
  joinAjoFund,
} from "@/api/mainapi/mainapi";
import {
  AjoFundListItem,
  CreateCrowdFundForm,
  CrowdFundItem,
} from "@/api/type";
import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { getApiErrorMessage } from "@/utils/apiError";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
  const [crowdfunds, setCrowdfunds] = useState<CrowdFundItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const normalizeCrowdFund = (
    fund: AjoFundListItem,
    isMine = false,
  ): CrowdFundItem => ({
    id: fund._id || Date.now().toString(),
    name: fund.title || "Untitled squad",
    details: fund.description || "",
    duration: fund.deadline
      ? new Date(fund.deadline).toISOString().split("T")[0]
      : "",
    targetAmount: fund.targetAmount || 0,
    raisedAmount: fund.amountRaised || 0,
    code: fund.inviteCode || "",
    createdAt: fund.createdAt ? fund.createdAt.split("T")[0] : "",
    creatorId: fund.creatorId || "",
    isMine,
  });

  useEffect(() => {
    const loadCrowdfunds = async () => {
      setIsLoading(true);

      try {
        const [publicResponse, myResponse] = await Promise.all([
          getPublicAjoFunds(),
          getMyAjoFunds(),
        ]);

        const publicFunds = Array.isArray(publicResponse?.data)
          ? publicResponse.data.map((item) => normalizeCrowdFund(item, false))
          : [];
        const myFunds = Array.isArray(myResponse?.data)
          ? myResponse.data.map((item) => normalizeCrowdFund(item, true))
          : [];

        const merged = [...myFunds, ...publicFunds];
        const uniqueFunds = merged.filter(
          (item, index, self) =>
            index === self.findIndex((candidate) => candidate.id === item.id),
        );

        setCrowdfunds(uniqueFunds);
      } catch (error: any) {
        Alert.alert(
          "Error",
          getApiErrorMessage(error, "Unable to load crowd funds"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCrowdfunds();
  }, []);

  // Generate a random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle create crowd fund
  const handleCreateCrowdfund = async () => {
    if (
      !createForm.name ||
      !createForm.details ||
      !createForm.duration ||
      !createForm.amount
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await createFund({
        title: createForm.name,
        description: createForm.details,
        targetAmount: Number(createForm.amount),
        visibility: "private",
        deadline: createForm.duration,
        category: "gift",
      });

      if (response?.success) {
        const newCrowdfund: CrowdFundItem = {
          id: Date.now().toString(),
          name: createForm.name,
          details: createForm.details,
          duration: createForm.duration,
          targetAmount: Number(createForm.amount),
          raisedAmount: 0,
          code: generateCode(),
          createdAt: new Date().toISOString().split("T")[0],
          creatorId: "user1",
        };

        setCrowdfunds([newCrowdfund, ...crowdfunds]);
        setShowCreateModal(false);
        setCreateForm({ name: "", details: "", duration: "", amount: "" });
        setShowFloatingOptions(false);
        Alert.alert(
          "Success",
          response.data?.message || "Crowd fund created successfully!",
        );
      } else {
        Alert.alert(
          "Error",
          response?.message || "Unable to create crowd fund",
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        getApiErrorMessage(error, "Unable to create crowd fund"),
      );
    }
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

  const handleAcceptCrowdfund = async () => {
    const trimmedCode = acceptCode.trim();

    if (!trimmedCode) {
      Alert.alert("Error", "Please enter a crowd fund code");
      return;
    }

    try {
      const response = await joinAjoFund({
        inviteCode: trimmedCode.toUpperCase(),
      });

      if (response?.success) {
        const joinedFund = response.data;
        const joinedCrowdFund: CrowdFundItem = {
          id: joinedFund?._id || Date.now().toString(),
          name: joinedFund?.title || "Joined Squad",
          details: joinedFund?.description || "",
          duration: joinedFund?.deadline
            ? new Date(joinedFund.deadline).toISOString().split("T")[0]
            : "",
          targetAmount: joinedFund?.targetAmount || 0,
          raisedAmount: joinedFund?.amountRaised || 0,
          code: joinedFund?.inviteCode || trimmedCode.toUpperCase(),
          createdAt: joinedFund?.createdAt
            ? joinedFund.createdAt.split("T")[0]
            : new Date().toISOString().split("T")[0],
          creatorId: joinedFund?.creatorId || "user1",
        };

        setCrowdfunds((current) => [joinedCrowdFund, ...current]);
        setShowAcceptModal(false);
        setAcceptCode("");
        setShowFloatingOptions(false);
        Alert.alert("Success", response.message || "Joined AjoFund");
        navigateToCrowdFundDetail(joinedCrowdFund);
      } else {
        Alert.alert(
          "Error",
          response?.message ||
            getApiErrorMessage(response, "Invalid invite code"),
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        getApiErrorMessage(error, "Unable to join crowd fund"),
      );
    }
  };

  const myCrowdfunds = crowdfunds.filter((item) => item.isMine);
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

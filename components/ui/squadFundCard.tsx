import CustomText from '@/app/shared/text/CustomText';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { computePercent, formatNaira, getRankTier, SFColors } from '../../constants/theme';
import { SquadFundItem } from '../../types/squadFund';

interface SquadFundCardProps {
  item: SquadFundItem;
  onPress: (item: SquadFundItem) => void;
  onViewLeaderboard: (item: SquadFundItem) => void;
  onContribute: (item: SquadFundItem) => void;
}

function ContributorStack({ contributors }: { contributors: SquadFundItem['contributors'] }) {
  const top3 = [...contributors].sort((a, b) => b.amount - a.amount).slice(0, 3);

  if (top3.length === 0) {
    return (
      <CustomText variant="caption" style={{ color: SFColors.textMuted }}>
        Be the first to contribute
      </CustomText>
    );
  }

  return (
    <View style={styles.stackRow}>
      <View style={styles.avatarStack}>
        {top3.map((c, i) => {
          const tier = getRankTier(c.amount);
          return (
            <View
              key={c.id}
              style={[
                styles.avatar,
                { backgroundColor: tier.bg, borderColor: SFColors.white, marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i },
              ]}
            >
              {i === 0 && (
                <View style={styles.crownBadge}>
                  <Ionicons name="trophy" size={9} color={SFColors.goldDeep} />
                </View>
              )}
              <CustomText style={[styles.avatarText, { color: tier.color }]}>{c.initials}</CustomText>
            </View>
          );
        })}
      </View>
      <CustomText variant="caption" style={styles.stackLabel}>
        {contributors.length} squad member{contributors.length === 1 ? '' : 's'}
      </CustomText>
    </View>
  );
}

const SquadFundCard: React.FC<SquadFundCardProps> = ({ item, onPress, onViewLeaderboard, onContribute }) => {
  const percent = computePercent(item.raisedAmount, item.targetAmount);
  const fillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fillAnim, { toValue: percent, duration: 900, useNativeDriver: false }).start();
  }, [percent]);

  const isPrivate = item.visibility === 'private';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.85}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <View style={[styles.visibilityDot, { backgroundColor: isPrivate ? SFColors.purple700 : SFColors.teal800 }]}>
            <Ionicons name={isPrivate ? 'lock-closed' : 'globe-outline'} size={11} color={SFColors.white} />
          </View>
          <CustomText variant="h4" bold style={styles.title} numberOfLines={1}>
            {item.name}
          </CustomText>
        </View>
        <View style={styles.durationChip}>
          <CustomText style={styles.durationText}>{item.duration}</CustomText>
        </View>
      </View>

      <CustomText variant="h6" style={styles.details} numberOfLines={2}>
        {item.details}
      </CustomText>

      {/* XP-style progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <CustomText style={styles.raisedText}>{formatNaira(item.raisedAmount)}</CustomText>
          <CustomText style={styles.targetText}>of {formatNaira(item.targetAmount)}</CustomText>
        </View>
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              {
                width: fillAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
              },
            ]}
          >
            <View style={styles.fillShine} />
          </Animated.View>
        </View>
        <CustomText style={styles.percentText}>{Math.round(percent)}% funded</CustomText>
      </View>

      {/* Leaderboard preview + invite code */}
      <View style={styles.leaderRow}>
        <ContributorStack contributors={item.contributors} />
        {isPrivate && item.inviteCode && (
          <View style={styles.codeChip}>
            <Ionicons name="key-outline" size={12} color={SFColors.purple700} />
            <CustomText style={styles.codeText}>{item.inviteCode}</CustomText>
          </View>
        )}
      </View>

      {/* Footer CTAs */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.leaderboardBtn} onPress={() => onViewLeaderboard(item)}>
          <Ionicons name="podium-outline" size={14} color={SFColors.purple900} />
          <CustomText style={styles.leaderboardBtnText}>Leaderboard</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contributeBtn} onPress={() => onContribute(item)}>
          <CustomText style={styles.contributeBtnText}>Contribute</CustomText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: SFColors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: SFColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, marginRight: 8 },
  visibilityDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, color: SFColors.textPrimary },
  durationChip: {
    backgroundColor: SFColors.purple50,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  durationText: { fontSize: 11, color: SFColors.purple700, fontWeight: '700' },
  details: { color: SFColors.textSecondary, marginBottom: 14 },

  progressSection: { marginBottom: 14 },
  progressLabelRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 6 },
  raisedText: { color: SFColors.purple900, fontSize: 16, fontWeight: '800' },
  targetText: { color: SFColors.textMuted, fontSize: 12 },
  track: {
    height: 10,
    backgroundColor: SFColors.purple50,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: SFColors.purple600,
    borderRadius: 999,
    justifyContent: 'center',
  },
  fillShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
  },
  percentText: { marginTop: 6, fontSize: 11, color: SFColors.textMuted, textAlign: 'right' },

  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  stackRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 10, fontWeight: '800' },
  crownBadge: {
    position: 'absolute',
    top: -7,
    alignSelf: 'center',
    backgroundColor: SFColors.goldLight,
    borderRadius: 8,
    padding: 1.5,
  },
  stackLabel: { color: SFColors.textMuted },
  codeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SFColors.purple50,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  codeText: { fontSize: 11, color: SFColors.purple700, fontWeight: '700' },

  footerRow: { flexDirection: 'row', gap: 8 },
  leaderboardBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: SFColors.border,
  },
  leaderboardBtnText: { fontSize: 13, fontWeight: '700', color: SFColors.purple900 },
  contributeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: SFColors.purple900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contributeBtnText: { fontSize: 13, fontWeight: '700', color: SFColors.purple50 },
});

export default SquadFundCard;
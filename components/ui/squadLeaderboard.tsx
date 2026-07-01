import CustomText from '@/app/shared/text/CustomText';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { formatNaira, SFColors } from '../../constants/theme';
import { Contributor } from '../../types/squadFund';
import RankBadge from '../rankBadge';

interface ContributorLeaderboardProps {
  contributors: Contributor[];
}

const MEDAL_COLORS = [SFColors.gold, SFColors.silver, SFColors.bronze];

function LeaderboardRow({ contributor, position }: { contributor: Contributor; position: number }) {
  const isTop3 = position < 3;

  return (
    <View style={[styles.row, contributor.isCurrentUser && styles.rowHighlight]}>
      <View style={styles.rankSlot}>
        {isTop3 ? (
          <Ionicons name="medal" size={20} color={MEDAL_COLORS[position]} />
        ) : (
          <CustomText style={styles.rankNumber}>{position + 1}</CustomText>
        )}
      </View>

      <View style={styles.avatar}>
        <CustomText style={styles.avatarText}>{contributor.initials}</CustomText>
      </View>

      <View style={styles.nameCol}>
        <CustomText style={styles.name} numberOfLines={1}>
          {contributor.name}
          {contributor.isCurrentUser ? ' (You)' : ''}
        </CustomText>
        <RankBadge amount={contributor.amount} size="sm" />
      </View>

      <CustomText style={styles.amount}>{formatNaira(contributor.amount)}</CustomText>
    </View>
  );
}

export default function ContributorLeaderboard({ contributors }: ContributorLeaderboardProps) {
  const sorted = [...contributors].sort((a, b) => b.amount - a.amount);

  if (sorted.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="trophy-outline" size={28} color={SFColors.textMuted} />
        <CustomText style={styles.emptyText}>No contributions yet. Be the first to climb the board.</CustomText>
      </View>
    );
  }

  return (
    <View>
      {sorted.map((c, i) => (
        <LeaderboardRow key={c.id} contributor={c} position={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 6,
  },
  rowHighlight: { backgroundColor: SFColors.purple50 },
  rankSlot: { width: 24, alignItems: 'center' },
  rankNumber: { color: SFColors.textMuted, fontWeight: '700', fontSize: 13 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: SFColors.purple100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: SFColors.purple900, fontWeight: '800', fontSize: 12 },
  nameCol: { flex: 1, gap: 4 },
  name: { color: SFColors.textPrimary, fontWeight: '600', fontSize: 13 },
  amount: { color: SFColors.purple900, fontWeight: '800', fontSize: 13 },
  emptyState: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  emptyText: { color: SFColors.textMuted, textAlign: 'center', maxWidth: 220 },
});
import React from "react";
import { Text, View } from "react-native";

import {
    InitialsAvatar,
    TierBadge
} from "./LeaderboardShared";


export function RankCard({
user,
rank,
styles
}:any){

return (

<View style={styles.rankCard}>

<Text style={styles.rankCardRank}>
#{rank}
</Text>

<InitialsAvatar
name={user.name}
size={44}
tier={user.tier}
/>


<Text style={styles.rankCardName}>
{user.name}
</Text>


<TierBadge
tier={user.tier}
compact
/>


<Text style={styles.rankCardPoints}>
{user.xPoints.toLocaleString()} XP
</Text>


</View>

)

}




export function ListRow({
user,
rank,
isYou,
styles
}:any){


return (

<View
style={[
styles.listRow,
isYou && styles.listRowActive
]}
>


<Text style={styles.listRank}>
{rank}
</Text>


<InitialsAvatar
name={user.name}
size={38}
tier={user.tier}
/>



<View style={{flex:1,marginLeft:12}}>


<Text style={styles.listName}>
{user.name}
</Text>


<TierBadge
tier={user.tier}
compact
/>

</View>



<Text style={styles.listPoints}>
{user.xPoints.toLocaleString()}
</Text>


</View>

)

}
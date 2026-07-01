import React, { useEffect, useRef } from "react";
import {
    Animated,
    Text,
    View
} from "react-native";

import {
    InitialsAvatar,
    TierBadge,
    User
} from "./LeaderboardShared";


const MEDAL={
1:{ring:"#FBBF24",step:130},
2:{ring:"#CBD5E1",step:92},
3:{ring:"#FB923C",step:72},
} as const;



export function PodiumItem({
 user,
 rank,
 delay,
 styles
}:{
 user:User;
 rank:1|2|3;
 delay:number;
 styles:any;
}){


const scale=useRef(new Animated.Value(0)).current;
const translateY=useRef(new Animated.Value(40)).current;
const pulse=useRef(new Animated.Value(0)).current;


useEffect(()=>{

Animated.sequence([
 Animated.delay(delay),
 Animated.parallel([
  Animated.spring(scale,{
   toValue:1,
   friction:6,
   tension:70,
   useNativeDriver:true
  }),

  Animated.spring(translateY,{
   toValue:0,
   friction:7,
   useNativeDriver:true
  })
 ])
]).start();


if(rank===1){

Animated.loop(
Animated.timing(pulse,{
 toValue:1,
 duration:2000,
 useNativeDriver:true
})
).start();

}


},[]);



const medal=MEDAL[rank];

const avatarSize=rank===1?64:52;



return (

<Animated.View
style={{
alignItems:"center",
flex:1,
transform:[
{scale},
{translateY}
]
}}
>


{
rank===1 &&
<Animated.Text
style={{
fontSize:26,
marginBottom:-6,
color:"#FBBF24"
}}
>
♛
</Animated.Text>
}



<View
style={{
alignItems:"center",
justifyContent:"center",
marginBottom:8
}}
>

<View
style={{
padding:3,
borderRadius:(avatarSize+6)/2,
backgroundColor:medal.ring
}}
>

<InitialsAvatar
name={user.name}
size={avatarSize}
tier={user.tier}
/>

</View>


</View>



<Text style={styles.podiumName}>
{user.name}
</Text>



<TierBadge
tier={user.tier}
compact
centered
/>



<View
style={[
styles.step,
{
height:medal.step,
borderColor:medal.ring+"55"
}
]}
>

<Text style={styles.stepRank}>
#{rank}
</Text>

<Text style={styles.stepPoints}>
{(user.xPoints/1000).toFixed(1)}k XP
</Text>


</View>


</Animated.View>

)

}
import { Loader } from "@/components/Loader";
import Post from "@/components/Post";
import StoriesSection from "@/components/Stories";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, RefreshControl,  Text, TouchableOpacity, View } from "react-native";
import AnimatedLogo from "../Text_logo";


export default function Index() {

  const {signOut}=useAuth(); 
  const [refreshing , setRefreshing] = useState(false);


  const posts = useQuery(api.posts.getFeedPosts);

  if( posts === undefined ) return <Loader/>

  if(posts.length === 0) return <NopostsFound/>

  const onRefresh = ()=> {
    //this function does nothing . just acting like refreshing
    setRefreshing(true);
    setTimeout(()=>{
   setRefreshing(false)
   //tanstack query
    },2000)
  };
  
  const handleSignOut = async () => {
    try {
      await signOut(); // Sign out the user
      console.log("User logged out");
      router.replace("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (<>
    <View style = {styles.container}>
    {/*HEADER*/}
      <View style={styles.header}>
       <AnimatedLogo />
       <TouchableOpacity onPress={()=>handleSignOut()}>
         <Ionicons name="log-out-outline" size={24} color={COLORS.white}/>
       </TouchableOpacity>
      </View>
      
      <FlatList
          data={posts}
          renderItem={({item}) => <Post post={item}/>}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:5}}
          initialNumToRender={5}              // Render fewer items initially
          maxToRenderPerBatch={5}           // Control rendering batch size
          windowSize={5}                      // Reduce memory usage
          ListHeaderComponent={<StoriesSection />}
          refreshControl={
            <RefreshControl 
               refreshing={refreshing}
               onRefresh={onRefresh}
               tintColor={COLORS.primary}

            />
          }
      />
    </View>
    
    </>
  );
}

const NopostsFound = () => {
  return (
    <View 
       style={{
        flex:1,
        backgroundColor:COLORS.background,
        justifyContent:"center",
        alignItems:"center",
       }}
    >
      <Text style={{fontSize: 20 , color : COLORS.primary }}>No posts yet</Text>
    </View>
  );
};








// ---------------
// {posts.map((post) => (
//   <Post 
//     key={post._id} 
//     post={{
//       ...post,
//       caption: post.caption || "", // Ensure caption is a string
//       author: {
//   ...post.author,
//   _id: post.author._id.toString(), // Ensure author._id is a string
//       }
//     }} 
//   /> 
// ))}


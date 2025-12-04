import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useEffect } from "react";
import { useQuery } from 'convex/react';
import { api } from './../../convex/_generated/api';
import { Loader } from '@/components/Loader';
import { COLORS } from './../../constants/theme';
import { styles } from './../../styles/feed.styles';
import { ScrollView } from "react-native";
import { Image } from "expo-image";

function ShowImg(){
{/* when image is pressed in . that image must be shown big in this function */}

}
export default function Bookmarks() {
  
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  if(bookmarkedPosts === undefined) return <Loader/>;
  if(bookmarkedPosts.length === 0) return <NoBookmarksFound />;
 
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>


        {/*posts*/}
        <ScrollView 
           contentContainerStyle={{
            padding:20,
            flexDirection:"row",
            flexWrap:"wrap",
           }}
        >
           {bookmarkedPosts.map((post) => {
            if (!post) return null;

            return (
              <View key={post._id} style={{ width: "33.33%", padding: 1,  }}>
                <TouchableOpacity >
                  <Image
                    source={post.imageUrl}
                    style={{ width: "100%", aspectRatio: 1 }}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                  />
                </TouchableOpacity>
              </View>
            );
          })}

        </ScrollView>

      
    </View>
  );
}

function NoBookmarksFound() {
  return(
    <View
       style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLORS.background,
       }}
    >
      <Text style={{color:COLORS.primary , fontSize:22}}>No bookmarked posts yet</Text>
    </View>
  )
}

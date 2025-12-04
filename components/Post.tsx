import { View, Text } from 'react-native'
import {styles} from '@/styles/feed.styles'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import {Id} from "@/convex/_generated/dataModel";
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useQuery } from 'convex/react';
import CommentsModal from './CommentsModal';
import { formatDistanceToNow } from 'date-fns';
import { toggleBookmark } from './../convex/bookmarks';
import { useUser } from '@clerk/clerk-expo';


//todo-add the actual type 

type PostProps = {
    post:{
        _id: Id<"posts">;
        imageUrl: string;
        caption?: string;
        likes:number;
        comments:number;
        _creationTime: number;
        isLiked: boolean;
        isBookmarked: boolean;
        author:{
            _id:string;
            username:string;
            image:string;
        };
    };
}


export default function Post( {post}  : PostProps) {
    // console.log('Post data:', post);
    // console.log('Author data:', post.author);

    const [isLiked , setIsLiked] =useState(post.isLiked);
    const [isBookmarked , setIsBookmarked] =useState(post.isBookmarked);
    //const [likesCount , setLikesCount] = useState(post.likes);
    //const [commentsCount , setCommentsCount] = useState(post.comments);
    const [showComments , setShowComments] = useState(false);

     const {user} = useUser()
     //console.log("user is here" , user);
     const currentUser = useQuery(api.users.getUderByClerkId, user ?  {clerkId: user.id} : "skip")
    //const latestPostData = useQuery(api.posts.getpost, { postId: post._id }); // Fetch real-time likes

    const toggleLike = useMutation(api.posts.toggleLike)
    const toggleBookmark = useMutation(api.bookmarks.toggleBookmark)
    const deletePost = useMutation(api.posts.deletePost);

    const handleLike = async () =>{
        try {
            const newIsliked = await toggleLike({postId: post._id} )
            setIsLiked(newIsliked)
           // setLikesCount((prev) => (newIsliked ? prev+1 : prev-1));
        } catch (error) {
            console.log("Error toggling like: ",error);
        }
    };

    const handleBookmark = async () =>{
 
        const newIsBookmarked = await toggleBookmark({ postId : post._id});
        setIsBookmarked(newIsBookmarked);
    };

    const handleDelete = async () =>{
    try {
        await deletePost({postId: post._id});
        
    } catch (error) {
        console.error("Error deleting post: ",error );
    }
    }

    return (
    <View style={styles.posts}>
        {/* POST HEADER */}
        <View style={styles.postHeader}>
            <Link href={
                currentUser?._id === post.author._id ? "/(tabs)/profile" : `/user/${post.author._id}`
            }
            asChild
            >
               <TouchableOpacity style={styles.postHeaderLeft}>
                <Image
                   source={post.author?.image ||"https://images.unsplash.com/photo-1705289015664-248660ed7af0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                   style={styles.postAvatar}
                   contentFit="cover"
                   transition={200}
                   cachePolicy="memory-disk"
                />

                <Text style={styles.postUsername}> {post.author?.username || 'Unknown User'} </Text>
                
               </TouchableOpacity>
            </Link>
           {/*SHOW A DELETE BUTTON*/}
           {/*TODO : fix it later*/}


           {/* if i'm the owner of the post , show the delete button*/}
            {post.author._id ===  currentUser?._id ? (
            <TouchableOpacity onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color={COLORS.white}/>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white}/>
            </TouchableOpacity>

            )}   
        </View>
        {/*IMAGE*/}
        <Image
          source={post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />

        {/*POST ACTIONS */}
        <View style={styles.postActions}>
            <View style={styles.postActionsLeft}>
                <TouchableOpacity onPress={handleLike}>
                    <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24}
                       color={isLiked ? COLORS.primary : COLORS.white}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowComments(true)}>
                    <Ionicons name="chatbubble-outline" size={22} color={COLORS.white}/>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleBookmark}>
                    <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={22} color={COLORS.white}/>
                </TouchableOpacity>
        </View>

        {/*POST INFO*/}
        <View style={styles.postInfo}>
            <Text style={styles.likesText}>
               {post.likes > 0 ? `${post.likes.toLocaleString()} likes` : "Be the first to like"}
            </Text>
            {post.caption && (
                <View style={styles.captionContainer}>
                    <Text style={styles.captionUsername}>{post.author.username}</Text>
                    <Text style={styles.captionText}>{post.caption}</Text>
                </View>
            )}
            {post.comments > 0 && (
                <TouchableOpacity onPress={()=> setShowComments(true)}>
                    <Text style={styles.commentText}>View all {post.comments} comments</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.timeAgo}>
                {formatDistanceToNow(post._creationTime , {addSuffix: true})}
            </Text>
        </View>
        <CommentsModal
          postId={post._id}
          visible = {showComments}
          onClose={() => setShowComments(false)}
        />

    </View>
  );
}
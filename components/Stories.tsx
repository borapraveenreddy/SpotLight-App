import { styles } from "@/styles/feed.styles";
import { ScrollView } from "react-native";
import { STORIES } from "@/constants/mock-data";
import Story from './Story';


const StoriesSection = ()=>{
  return(
    //  {/*STORIES*/}
       <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >

          {STORIES.map((storyItem) => (
            <Story key={storyItem.id} story={storyItem}/>
          ))}
      </ScrollView>
  );
}

export default StoriesSection;
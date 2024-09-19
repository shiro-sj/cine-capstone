import { TouchableOpacity, View, Text, Image, StyleSheet,Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';



const movieDetails = () => {

  const { name } = useLocalSearchParams();
  const screenWidth = Dimensions.get('window').width;

// const data = {
//   "Actors": "Lucas Black, Zachery Ty Bryan, Shad Moss",
//   "Awards": "1 win & 4 nominations",
//   "BoxOffice": "$62,514,415",
//   "Country": "United States, Germany, Japan",
//   "DVD": "N/A",
//   "Director": "Justin Lin",
//   "Genre": "Action, Crime, Thriller",
//   "Language": "English, Japanese, Portuguese",
//   "Metascore": "45",
//   "Plot": "A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg",
//   "Production": "N/A",
//   "Rated": "PG-13",
//   "Ratings": [
//     {
//       "Source": "Internet Movie Database",
//       "Value": "6.1/10"
//     },
//     {
//       "Source": "Rotten Tomatoes",
//       "Value": "37%"
//     },
//     {
//       "Source": "Metacritic",
//       "Value": "45/100"
//     }
//   ],
//   "Released": "16 Jun 2006",
//   "Response": "True",
//   "Runtime": "104 min",
//   "Title": "The Fast and the Furious: Tokyo Drift",
//   "Type": "movie",
//   "Website": "N/A",
//   "Writer": "Chris Morgan",
//   "Year": "2006",
//   "imdbID": "tt0463985",
//   "imdbRating": "6.1",
//   "imdbVotes": "305,173"
// }



  const [data, setData] = useState(null);

  const link = `http://www.omdbapi.com/?t=${name.toString()}&apikey=b0620182`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(link);
        const result = await responce.json();
        setData(result);
        console.log(result)
      }
      catch (error) {
        console.log('error', error)
      }
    }

    fetchData();
  }, []);

  if (!data) {
    return <Text>loading</Text>
  }

  return (
    <ScrollView>
    <LinearGradient colors={['#000000', '#333333']} style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={{ uri: data.Poster }} 
          style={[styles.image,{ width: screenWidth, height: screenWidth * 1.3 }]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>{data.Title}</Text>
          <Text style={styles.subtitle}>Year: {data.Year}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Rated: {data.Rated}</Text>
            <Text style={styles.detail}>Released: {data.Released}</Text>
            <Text style={styles.detail}>Runtime: {data.Runtime}</Text>
          </View>

          <Text style={styles.plot}>{data.Plot}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Genre</Text>
            <Text style={styles.subtitle}>{data.Genre}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Director</Text>
            <Text style={styles.subtitle}>{data.Director}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Writer</Text>
            <Text style={styles.subtitle}>{data.Writer}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Actors</Text>
            <Text style={styles.subtitle}>{data.Actors}</Text>
          </View>

          <View style={styles.ratingsContainer}>
            <Text style={styles.title}>Ratings</Text>
            {data.Ratings.map((rating, index) => (
              <View key={index} style={styles.ratingItem}>
                <Text style={styles.ratingSource}>{rating.Source}: {rating.Value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    resizeMode: 'cover',
    marginBottom:40
  },
  infoContainer: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: 10,
    marginBottom: 5,
  },
  plot: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 24,
    marginVertical: 10,
  },
  ratingsContainer: {
    marginTop: 20,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  ratingSource: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: 10,
  },
});

export default movieDetails;
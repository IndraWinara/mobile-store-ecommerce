import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import splash1 from "../../assets/images/splash1.png";
import { theme, themeInput } from "../../style/theme";
import { useNavigation } from "@react-navigation/native";


const GetStarted = ({ pageNumber, description,title,imageContent}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.pageCount}>
          <Text style={styles.pageText}>{pageNumber}</Text>
          <Text style={[styles.pageText, { color: themeInput.text }]}>/3</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={[styles.pageText, { fontWeight: "bold" }]}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.midContainer}>
        <Image source={imageContent ? imageContent : splash1} />
        <Text style={styles.textTitle}>{title ? title : ''}</Text>
        <View style={{ height: "30%" }}>
          <Text style={styles.textDescription}>
           {description ? description : ''}
          </Text>
        </View>
      </View>
      <View style={styles.botContainer}>
      {(() => {
            switch ((page = pageNumber)) {
              case 1:
                return (
                  <View></View>
                )
              case 2:
                return (
                  <TouchableOpacity onPress={() => navigation.navigate(`open1`)}>
                    <Text style={styles.botText}>Prev</Text>
                  </TouchableOpacity>
                )
              case 3:
                return (
                  <TouchableOpacity onPress={() => navigation.navigate(`open2`)}>
                    <Text style={styles.botText}>Prev</Text>
                  </TouchableOpacity>
                )
              default:
                return null;
            }
          })()}
        <View style={styles.currentPage}>
          {(() => {
            switch ((page = pageNumber)) {
              case 1:
                return <Text> 🌍✖️✖️</Text>;
              case 2:
                return <Text> ✖️🌍✖️</Text>;
              case 3:
                return <Text> ✖️✖️🌍</Text>;
              default:
                return null;
            }
          })()}
        </View>
        {/* to do ganti validasi dil luar opacity */}
        {(() => {
            switch ((page = pageNumber)) {
              case 1:
                return (
                  <TouchableOpacity onPress={() => navigation.navigate(`open2`)}>
                    <Text style={styles.botText}>Next</Text>
                  </TouchableOpacity>
                )
              case 2:
                return (
                  <TouchableOpacity onPress={() => navigation.navigate(`open3`)}>
                    <Text style={styles.botText}>Next</Text>
                  </TouchableOpacity>
                )
              case 3:
                return (
                  <TouchableOpacity onPress={() => navigation.navigate(`login`)}>
                    <Text style={styles.botText}>Get Started</Text>
                  </TouchableOpacity>
                )
              default:
                return null;
            }
          })()}
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 40,
    backgroundColor: theme.primary,
    height: "95%",
    padding: 10,
    justifyContent: "space-between",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  midContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pageCount: {
    flexDirection: "row",
  },
  pageText: {
    fontSize: 20,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  textDescription: {
    textAlign: "center",
    marginTop: 15,
    lineHeight: 20,
    fontSize: 15,
    color: themeInput.text,
  },
  botContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  botText: {
    fontSize: 18,
    fontWeight: "500",
    color: theme.secodary,
  },
  currentPage: {
    flexDirection: "row",
  },
});

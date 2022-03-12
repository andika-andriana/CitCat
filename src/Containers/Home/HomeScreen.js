import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  BackHandler,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Image,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  AnimationView,
  Gap,
  HomeHeaderComponent,
  HomeSearchComponent,
  ListEmptyComponent
} from '../../Components'
import { CatList, ChangeLoadMore, SearchCat } from '../../Services/Cat/CatList'
import { Colors, Images } from '../../Theme'

const HomeScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cat_list = useSelector(state => state.cat_list)
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(10);
  const [Refreshing, setRefreshing] = useState(false);
  const [Keyword, setKeyword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [ActiveIndex, setActiveIndex] = useState(null);

  const reGetCatList = () => {
    if (Page != 1) setPage(1);
    else dispatch(CatList(Page, Limit));
  }

  const fetchMoreData = () => {
    if (!cat_list.load_more) {
      if (cat_list.data?.current_page < cat_list.data?.last_page) {
        setPage(Page + 1);
        dispatch(ChangeLoadMore(true));
      }
    }
  }

  const onCardPressed = (index) => {
    if (index == ActiveIndex) setActiveIndex(null);
    else setActiveIndex(index)
  }

  const onClearPressed = () => {
    setKeyword('');
    reGetCatList();
  }

  const onSearchPressed = () => {
    dispatch(SearchCat(Keyword));
  }

  useEffect(() => {

    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    /* fix leak memory warning */
    let isCancelled = false;

    try {
      if (isCancelled == false) {
        dispatch(CatList(Page, Limit));
      }
    } catch (error) {
      // console.log(error)
    }

    return () => {
      isCancelled = true;

      backHandler.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();

    };
    /* fix leak memory warning */
  }, [Page])

  const renderEmpty = () => {
    if (!cat_list.loading && !cat_list.error) {
      return <ListEmptyComponent />
    } else {
      return null;
    }
  }

  const renderFooter = () => {
    if (cat_list.load_more) {
      return <ActivityIndicator size={"large"} color={Colors.white} style={styles.listFooterIndicator} />
    } else {
      return null;
    }
  }

  const handleRenderFlatlist = ({ item, index, separators }) => {
    return (
      <AnimationView>
        <TouchableOpacity activeOpacity={1} onPress={() => onCardPressed(index)}>
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemName}>{item.name}</Text>

            {/* Conditional Chevron */}

            {
              ActiveIndex == index
                ? (
                  <AnimationView type={'d'} duration={100}>
                    <Image source={Images.chevron} style={styles.listItemChevron} resizeMode={'contain'} />
                  </AnimationView>
                ) : (
                  <AnimationView type={'u'} duration={100}>
                    <Image source={Images.chevron} style={styles.listItemChevron} resizeMode={'contain'} />
                  </AnimationView>
                )
            }

          </View>
        </TouchableOpacity>

        {/* Conditional Collapse */}

        {
          ActiveIndex == index
            ? (
              <AnimationView>
                <View style={styles.listItemDesc}>
                  <Text style={styles.listItemDescText}>{item.description}</Text>
                </View>
              </AnimationView>
            ) : null
        }

      </AnimationView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.blue} barStyle={"light-content"} />

      {/* Header */}
      {!isKeyboardVisible && <HomeHeaderComponent />}

      {/* Body */}
      <View style={styles.contentContainer}>

        {/* Search Section */}
        <HomeSearchComponent
          value={Keyword}
          setValue={setKeyword}
          onClear={onClearPressed}
          onSearch={onSearchPressed}
        />

        {/* List Section */}
        <View style={styles.listContainer}>

          {/* Conditional Loading */}
          {cat_list.loading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size={"large"} color={Colors.white} />
            </View>
          )}

          {/* Conditional Loading */}
          {cat_list.error && !cat_list.loading && (
            <View style={styles.centerContainer}>
              <Text style={styles.errorText}>Terjadi kesalahan</Text>
              <Text style={styles.errorText}>Silahkan coba lagi</Text>
              <Gap height={30} />
              <TouchableOpacity onPress={reGetCatList}>
                <View style={styles.errorButtonContainer}>
                  <Text style={styles.errorButtonText}>Coba lagi</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}


          {/* List */}
          <View>
            {cat_list.list_data && (
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                initialNumToRender={1}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                overScrollMode={'never'}
                data={cat_list.list_data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={handleRenderFlatlist}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                onEndReachedThreshold={0.8}
                onEndReached={fetchMoreData}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={reGetCatList}
                    colors={[Colors.blue, Colors.white]}
                  />
                }
              />
            )}
          </View>
          {/* List */}

        </View>
        {/* List Section */}

      </View>
      {/* Body */}

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  contentContainer: {
    flex: 6
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
    paddingTop: 10,
    paddingLeft: 10,
    borderTopEndRadius: 100,
  },
  list: {
    marginTop: 0,
    overflow: 'hidden',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listFooterIndicator: {
    marginTop: 10
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 30
  },
  listItemName: {
    fontSize: 30,
    color: Colors.white
  },
  listItemChevron: {
    width: 30,
    height: 30
  },
  listItemDesc: {
    marginRight: 50,
    alignItems: 'flex-start',
    marginBottom: 20
  },
  listItemDescText: {
    color: Colors.white,
    fontSize: 16
  },
  errorText: {
    fontSize: 16,
    color: Colors.white
  },
  errorButtonContainer: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10
  },
  errorButtonText: {
    fontSize: 14,
    color: Colors.text
  }
})

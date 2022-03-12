import {
  rCatList,
  rCatListSuccess,
  rCatListError,
  rChangeLoadMore,
  rChangeListData
} from '../../Store/Cat/CatList';
import axios from 'axios';
import { Config } from '../../Config'
import { concat } from 'lodash';

export const CatList = (page, limit) => async (dispatch, getState) => {
  if (page != 1) {
    axios({
      method: 'GET',
      url: Config.API_URL + 'breeds',
      headers: {},
      params: {
        page: page,
        limit: limit
      },
      timeout: 30000,
      timeoutErrorMessage: 'timeout'
    }).then((res) => {
      // console.log('CatList res', res);
      if (res.status == 200) {
        let state = getState();
        dispatch(rCatListSuccess({
          current_page: res.headers['pagination-page'],
          last_page: res.headers['pagination-count']
        }));
        dispatch(rChangeListData(concat(state.cat_list.list_data, res.data)))

      } else {
        dispatch(rCatListError());
      }
    }).catch((err) => {
      // console.log('CatList err', err);
      dispatch(rCatListError());
    });
  } else {
    dispatch(rCatList())
    axios({
      method: 'GET',
      url: Config.API_URL + 'breeds',
      headers: {
        'x-api-key': Config.API_KEY
      },
      params: {
        page: page,
        limit: limit
      },
      timeout: 30000,
      timeoutErrorMessage: 'timeout'
    }).then((res) => {
      // console.log('CatList res', res);
      if (res.status == 200) {
        dispatch(rCatListSuccess({
          current_page: res.headers['pagination-page'],
          last_page: res.headers['pagination-count']
        }));
        dispatch(rChangeListData(res.data));
      } else {
        dispatch(rCatListError());
      }
    }).catch((err) => {
      // console.log('CatList err', err);
      dispatch(rCatListError());
    });
  }
}

export const ChangeLoadMore = (booleans) => async dispatch => {
  dispatch(rChangeLoadMore(booleans))
}

export const SearchCat = (keyword) => async dispatch => {
  dispatch(rCatList())
  axios({
    method: 'GET',
    url: Config.API_URL + 'breeds/search',
    headers: {
      'x-api-key': Config.API_KEY
    },
    params: {
      q: keyword
    },
    timeout: 30000,
    timeoutErrorMessage: 'timeout'
  }).then((res) => {
    // console.log('CatList res', res);
    if (res.status == 200) {
      dispatch(rCatListSuccess({
        searching: true
      }));
      dispatch(rChangeListData(res.data));
    } else {
      dispatch(rCatListError());
    }
  }).catch((err) => {
    // console.log('CatList err', err);
    dispatch(rCatListError());
  });
}
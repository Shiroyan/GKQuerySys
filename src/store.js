/**
 * Created by Shiro on 2017/6/2.
 */

export const store = {
  state: {
    searchResult: undefined,
    scoreQueryResult: undefined,
  },
  setSearchResultAction(newVaule){
    this.state.searchResult = newVaule;
  },
  setScoreQueryResultAction(newVal) {
    this.state.scoreQueryResult = newVal;
  }
};


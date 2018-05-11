/* store getters */
export default {
  getIncludeAllSelect: state => {
    let selectData = state.selectData;
    let allSelect = {
      verbose:'全部',
      key:'',
    }
    for(let i in selectData){
      selectData[i].unshift(allSelect);
    }
    return selectData;
  },

}

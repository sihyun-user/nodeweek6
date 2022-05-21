const appVerify = {
  // 檢查 ObjectId 型別是否有誤
  checkId: (objectId) =>  {
    if (!objectId.match(/^[0-9a-fA-F]{24}$/)) {
      return false;
    };
  
    return true;
  }
};

module.exports = appVerify;
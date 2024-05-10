export const Utils = {

    cleanLocalStorage: async () =>{
        let myVisitors : any = [];
        let myToken_px : string = '';
        let mycore_id : string = '';
        let my_refresh_token : string = '';
        let netStatus : string = ''
  
        if(localStorage.getItem('netStatus') != null){
          netStatus = await JSON.parse(localStorage.getItem('netStatus'));
        }
  
        if(localStorage.getItem('visitors') != null){
          myVisitors = await JSON.parse(localStorage.getItem('visitors'));
        }
  
        if(localStorage.getItem('token_px') != null){
          myToken_px = await localStorage.getItem('token_px');
        }
  
        if(localStorage.getItem('my-refresh-token') != null){
          my_refresh_token = await localStorage.getItem('my-refresh-token');
        }
  
        if(localStorage.getItem('core-id') != null){
          mycore_id = await localStorage.getItem('core-id');
        }
  
  
        await localStorage.clear();
        await localStorage.setItem('netStatus',JSON.stringify(netStatus));
        await localStorage.setItem('visitors',JSON.stringify(myVisitors));
        await localStorage.setItem('token_px', myToken_px);
        await localStorage.setItem('my-refresh-token', my_refresh_token);
        await localStorage.setItem('core-id', mycore_id);
    
      },
}
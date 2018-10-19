export function setCounter (state = {count: 0} , action){  
    switch (action.type) {  
        case 'increase':  
            console.log(state.count)
            return {count: state.count + 1};  
        case 'decrease':  
            console.log(state.count)
            return {count: state.count - 1};
            
        default:  
            return state;  
    }  
}  

export function test(state = 10, action) {
  switch (action.type) {  
      case 'testaA':  
          console.log(state)
          return state + 1;  
          
      default:  
          return state;  
  }  
}  

  
// export default setCounter;  


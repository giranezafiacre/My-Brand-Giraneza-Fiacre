let arr = [1, 2, 3, 3, 4, 5, 2, 8, 9, 10]
let arr1 = [], arr2 = [], j = 1;
for (i = 0; i < arr.length; i++) {
        arr2.push(arr[i]);
        if(arr2.length==3){
            arr1.push(arr2);
            arr2=[];
        }else if(!arr[i+1]){
            arr1.push(arr2);
        }
}
// for(i=0;i<3;i++){

// }
/*console.log(snapshot.Id)
        let length = snapshot.Dd.docChanges.length;
        let arr = snapshot.Dd.docChanges;
        arr = arr.map(x => x.doc.Xe.proto.mapValue.fields)
        console.log(arr)
        let arrCopy = [], arr2 = [], j = 1;
        for (let i = 0; i < arr.length; i++) {
            arr2.push(arr[i]);
            if (arr2.length == 3) {
                arrCopy.push(arr2);
                arr2 = [];
            } else if (!arr[i + 1]) {
                arrCopy.push(arr2);
            }
        }*/
console.log(arr1)
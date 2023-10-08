

const taskList1 = document.querySelector('#task-list1');
//IT IS A METHOD FOR RENDERING POST DETAILS WITH WORKER NAME
function renderCafe(Workerid,wname,doc){

    let li = document.createElement('tr');
    let workername =document.createElement('td');
    let workerid =document.createElement('td');
    let username = document.createElement('td');
    let trashSize = document.createElement('td');
    let type =document.createElement('td');
    let address = document.createElement('td');
    let postalCode = document.createElement('td');
    let description = document.createElement('td');
    let image = document.createElement('img');
  //  let add = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    username.textContent = doc.data().username;
    workername.textContent=wname;
    workerid.textContent=Workerid;
    type.textContent="post";
    trashSize.textContent = doc.data().trashSize;
    address.textContent = doc.data().address;
    postalCode.textContent=doc.data().postalCode;
    description.textContent = doc.data().description;
    image.src = doc.data().postUrl;
  //  add.thyperLinkontent = 'submit';
  li.appendChild(workername);
    li.appendChild(workerid);
    li.appendChild(type);
    li.appendChild(username);
    li.appendChild(trashSize);
    li.appendChild(address);
    li.appendChild(postalCode);
      li.appendChild(description);
    li.appendChild(image);
  //li.appendChild(add);
    taskList1.appendChild(li);
    let taskid = String(doc.id);
    let uname = String(doc.data().username);
    let locality = String(doc.data().address);
    let pincode = String(doc.data().postalCode);
    let size = String(doc.data().trashSize);
    let latitude = String(doc.data().latitude);
    let longitude = String(doc.data().longitude);
    let postUrl = String(doc.data().postUrl);

writeUserData(Workerid,"post",taskid,wname,uname,size,locality,pincode,latitude,longitude,postUrl);

}
function renderCafe2(Workerid,wname,doc){

    let li = document.createElement('tr');
    let workername =document.createElement('td');
    let workerid =document.createElement('td');
    let username = document.createElement('td');
    let trashSize = document.createElement('td');
    let type =document.createElement('td');
    let address = document.createElement('td');
    let postalCode = document.createElement('td');

    li.setAttribute('data-id', doc.id);
    username.textContent = doc.data().username;
    workername.textContent=wname;
    workerid.textContent=Workerid;
    trashSize.textContent = doc.data().trashSize;
    address.textContent = doc.data().address;
    type.textContent= "pickup";
    postalCode.textContent=doc.data().postalCode;
  li.appendChild(workername);
    li.appendChild(workerid);
      li.appendChild(type);
    li.appendChild(username);
    li.appendChild(trashSize);
    li.appendChild(address);
    li.appendChild(postalCode);

    taskList1.appendChild(li);
    let taskid = String(doc.id);
    let uname = String(doc.data().username);
    let locality = String(doc.data().address);
    let pincode = String(doc.data().postalCode);
    let size = String(doc.data().trashSize);
    let latitude=String(doc.data().latitude);
    let longitude=String(doc.data().longitude);
let pickUrl = "abc";
writeUserData(Workerid,"Pick",taskid,wname,uname,size,locality,pincode,latitude,longitude,pickUrl);

}
function renderCafe1(doc){
  console.log(doc)


let postaCode = String(doc.data().postalCode);
let Workerid = String(doc.data().wid);
let wname = String(doc.data().username);

db.collection('Post').where('postalCode','==',postaCode).orderBy('trashSize').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change.doc.data());
                renderCafe(Workerid,wname,change.doc);

            });
        });

        db.collection('Pick').where('postalCode','==',postaCode).orderBy('trashSize').onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        console.log(change.doc.data());
                        renderCafe2(Workerid,wname,change.doc);

                    });
                });
  }
  //second database


db.collection('Worker').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          console.log(change.doc.data());
          renderCafe1(change.doc);

    });
      });
      //for write in database
function writeUserData(Workerid,type,taskid,wname,uname,size,locality,pincode,latitude,longitude,postUrl){
       try{
       firebase.firestore().collection('worktask').doc(taskid).set(
         {
           wid: Workerid,
           taskType: type,
           workerName: wname,
           userName: uname,
           trashSize:size,
           address: locality,
           postalCode: pincode,
           taskId : taskid,
           latitude: latitude,
           longitude: longitude,
          photoUrl:postUrl
         }
       )
     }
     catch(err){
       console.log(err);
     }



}

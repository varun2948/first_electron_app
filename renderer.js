const myNotification = new Notification('Title',{
    body: 'Notification From the Renderer Process'
});
myNotification.onclick =()=>{
    console.log('Notification Clicked!');
}
console.log('Starting app');

setTimeout(()=>{
	console.log('Inside');
},2000);

setTimeout(()=>{
	console.log('Inside timeout 2');
},0);

console.log('Finishing app');
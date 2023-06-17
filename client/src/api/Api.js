

export const apiInfo = async (inputData) => {

    
     await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputData.title,
          body: inputData.body,
          creator: inputData.creator
        })
      });
     
}

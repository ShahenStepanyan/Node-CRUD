

export const apiInfo = async (inputData, navigate, met) => {

    
    const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputData.title,
          body: inputData.body,
          creator: inputData.creator
        })
      });
      alert("successfully")
      navigate('/home')
}

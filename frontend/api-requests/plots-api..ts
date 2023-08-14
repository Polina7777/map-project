const url_ngrok =  'http://localhost:1337/'

export const getAllPlots = async()=>{
    const response = await fetch(`${url_ngrok}api/plots`,{method:'GET'});
    const data = await response.json();
    const plots = data.data
    return plots;
}
export const getAllPlotsWithCollection = async()=>{
    const response = await fetch(`${url_ngrok}api/plots&populate=*`,{method:'GET'});
    const data = await response.json();
    const plots = data
    return plots;
}

export const getPlotById = async(id:string)=>{
    const response = await fetch(`${url_ngrok}api/plots/${id}`,{method:'GET'});
    const data = await response.json();
    const plot = data.data
    return plot;
}
export const getPlotByIdWithCollection = async(id:string)=>{
    const response = await fetch(`${url_ngrok}api/plots/${id}?populate=*`,{method:'GET'});
    const data = await response.json();
    const plot = data.data
    return plot;
}


export const createNewPlot =  async (level:any,pointSet:any) => {
   //pointSetArr = []
    const responseCreatePlot = await fetch(`${url_ngrok}api/plots`, {
      headers:{
             "Content-Type": "application/json",
               },
      method: "POST",
      body: JSON.stringify({
        data:{
            level:level,
            point_set:pointSet,
        }   
              }),
    });
    const data = await responseCreatePlot.json();
    const plot = data;
    return plot;
    // const responseConnectAllCollections = await fetch(`${url_ngrok}api/plots/${plot.data.id}`, {
    //     headers:{
    //            "Content-Type": "application/json",
    //              },
    //     method: "PUT",
    //     body: JSON.stringify({
    //              data:{
    //                 categories:{
    //                     connect:[4,categoryId]
    //                 },
    //                 small_extra_info:{
    //                     connect: [smallInfoCollectionId.id],
    //                 },
    //                 extra_info:{
    //                     connect: [extraInfoCollectionId.id],
    //                 },
    //                 processing:{
    //                     connect:[processCollectionId.id]
    //                 },
    //                 ingredient_collection:{
    //                     connect:[ingredientCollectionId.id]
    //                 }
    //              }
    //             }),
    //   });
  
    // const connectData = await responseConnectAllCollections.json();
  };


export const recipesApi = {getAllPlots,getPlotById,getPlotByIdWithCollection,getAllPlotsWithCollection,createNewPlot}
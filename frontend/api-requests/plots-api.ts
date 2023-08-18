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

export const deletePlotById = async(id:string)=>{
  const response = await fetch(`${url_ngrok}api/plots/${id}`,{method:'DELETE'});
  const data = await response.json();
  const plot = data.data
  return plot;
}

export const createNewPlot =  async (title:any,level:any,pointSet:any) => { 
    const responseCreatePlot = await fetch(`${url_ngrok}api/plots`, {
      headers:{
             "Content-Type": "application/json",
               },
      method: "POST",
      body: JSON.stringify({
        data:{
            title:title,
            level:level,
            point_set:pointSet,
        }   
              }),
    });
    const data = await responseCreatePlot.json();
    const plot = data;
    return plot; 
  };
  export const updatePlot =  async (id:any,pointSet) => { 
    const responseCreatePlot = await fetch(`${url_ngrok}api/plots/${id}`, {
      headers:{
             "Content-Type": "application/json",
               },
      method: "PUT",
      body: JSON.stringify({
        data:{
            point_set:pointSet,
        }   
              }),
    });
    const data = await responseCreatePlot.json();
    const plot = data;
    return plot;

  };
  


export const plotsApi = {getAllPlots,getPlotById,getPlotByIdWithCollection,getAllPlotsWithCollection,createNewPlot,deletePlotById,updatePlot}
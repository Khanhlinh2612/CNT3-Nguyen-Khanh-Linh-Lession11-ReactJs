import React, { useEffect, useState } from 'react';
import './App.css';
import NklCategoryList from './components/NklCategoryList';
import axios from './api/NklApi';
import NklCategoryForm from './components/NklCategoryForm';

function NklApp() {
  const [nklCategories, setNklCategories] = useState([]);

  const getCategories = async () => {
    try {
      const nklCateResponse = await axios.get("NklCategory");
      setNklCategories(nklCateResponse.data);
    } catch (error) {
      console.log("lỗi: ", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("nklCategories: ", nklCategories);
  }, [nklCategories]); 

  // Trạng thái form
  const [nklCategoryIsForm, setNklCategoryIsForm] = useState(false);
  //Duữ liệu form: add/edit
  let nklCategoryInit = {
    nklId: 0,
    nklCategoryName: "",
    nklCategoryStatus: true
}
  const [nklCategoryEdit, setNklCategoryEdit] = useState("nklCategoryInit");


  const nklHandleAddNew = (param)=>{
    setNklCategoryIsForm(param);
  }

  const nklHandleCategoryCloseForm=(param)=>{
    setNklCategoryIsForm(param);
  }

  const nklHandleCategorySubmit=(param)=>{
    let id= nklCategories[nklCategories.length-1].nklId;
    console.log("Mã",id);
    param.nklId= id+1;
    nklCategories.push(param)
    setNklCategories((prev)=>{
      return[...prev];
    })
    setNklCategoryIsForm(false);

  }

  //ham xoa 1 doi tuong
  const nklHandleDelete = (nklId)=>{
    console.log("App-Delete-nklId:",nklId);
    // xoa tren Api
    const nklResponse =  axios.delete(`NklCategory/${nklId}`);

    console.log("nklResponse-Delete",nklResponse);

    let nklDelete = nklCategories.filter(x=>x.nklId !== nklId)
    setNklCategories(nklDelete);
    console.log("Delete:",nklDelete);
  }

  //edit catagory
  const nklHandleEdit = (nklCategory)=>{


    setNklCategoryEdit(nklCategory);
    setNklCategoryIsForm(true);

  }


  return (
    <div className="container border my-3">
      <h1>Trinh Huu Phuc - Call Api</h1>
      <NklCategoryList renderNklCategories={nklCategories} 
                        onAddNew={nklHandleAddNew}
                        onNklDelete={nklHandleDelete}
                        onNklEdit={nklHandleEdit}/>
      <hr/>
      {
        nklCategoryIsForm===true?<NklCategoryForm 
                                  renderNklCategory = {nklCategoryEdit}
                                  onCloseForm={nklHandleCategoryCloseForm}
                                  onCategorySubmit={nklHandleCategorySubmit}

                                  />:""
      }
      
    </div>
  );
}

export default NklApp;

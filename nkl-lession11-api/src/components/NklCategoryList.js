import React from 'react'

export default function NklCategoryList({ renderNklCategories, onAddNew, onNklDelete, onNklEdit }) {
  console.log("renderNklCategories: ", renderNklCategories);
  let nklCategoryElement = renderNklCategories.map((nklCategory, index) => {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{nklCategory.nklId}</td>
        <td>{nklCategory.nklCategoryName}</td>
        <td>{nklCategory.nklCategoryStatus === true ? "Hiển thị " : "tạm khóa"}</td>
        <td>
          <button className='btn btn-danger'
            onClick={() => nklHandleDelete(nklCategory.nklId)}>
            Delete
          </button>
          <button className='btn btn-success'
            onClick={() => nklHandleEdit(nklCategory)}>
            Edit
          </button>
        </td>

      </tr>
    )
  })

  const nklHandleAdd = () => {
    onAddNew(true);
  }

  //hàm x.lý sự kiện xóa
  const nklHandleDelete = (nklId) => {
    if (window.confirm('bạn có thật sự muốn xóa Catagory có mã[' + nklId + '] không')) {
      console.log("Delete:", nklId);
      onNklDelete(nklId)
    }
    else {

    }
  }

  //ham edit
  const nklHandleEdit=(nklCategory)=>{
    onNklEdit(nklCategory);
  }


  return (
    <div className='container m-2'>
      <h2> Danh sach san pham</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {nklCategoryElement}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={nklHandleAdd}>Add new</button>
    </div>
  )
}

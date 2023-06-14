import React, { useState } from "react";
import { createSuccessToast } from "@/utils/toastNotification";
import axios from "axios";

function CommentComponent({ comment, username, date, userId, recipeId, commentId, session }) {
  const [deleteModal, setDeleteModal] = useState();
  const [editModal, setEditModal] = useState();
  const [commentText, setCommentText] = useState(comment);
  const [commentVisible, setCommentVisible] = useState(true);
  const [editComment, setEditComment] = useState(false);
  const token = session.user.token;

  const updateCommentRequest = async (commentId) => {
    try {
      const response = await axios.put(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}/comments/${commentId}/edit`,
        {
          commentText: commentText
        },
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );
      return response.data;
    } catch(error) {
      console.log('Comment cannot be updated!');
    }
  };

  const deleteCommentRequest = async (commentId) => {
    try {
      const response = await axios.delete(
        `${process.env.DOMAIN_NAME}/recipes/${recipeId}/comments/${commentId}/delete`, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log('Comment cannot be deleted!');
    }
  };

  const deleteCommentHandler = async (id) => {
    const response = deleteCommentRequest(id);
    setCommentVisible(false);
    createSuccessToast("Comment Successfully Deleted!");
    setDeleteModal(!deleteModal);
    return await response.data;
  }

  const editCommentHandler = async (id) => {
    const response = updateCommentRequest(id);
    createSuccessToast("Comment Successfully Updated!");
    setEditModal(!editModal);
    return await response.data;
  }

  return (
    <>
      {
        commentVisible
          ? 
          <>
            <hr />
            <div className="flex items-center mt-4">
      
              <p className="text-lg bg-gray-300 text-center p-2 rounded-full">{username.charAt(0)}</p>

              <div className="flex flex-col ml-2">
                <h4 className="font-bold">{username}</h4>
                <p className="italic text-slate-500 text-sm">{ date ? date.slice(0, 10) : "Unable to get date"}</p>
              </div>
            </div>
            <p className="pt-4 pb-4 max-h-32 overflow-y-auto">{commentText}</p>
            {
              userId === session.user.accountData[0].user_id 
              ? 
              <div className="flex items-center justify-between">
                <button className="text-lg p-1 cursor-pointer" onClick={() => setEditModal(!editModal)}>✏️Edit</button>
                <button className="text-lg p-1 cursor-pointer" onClick={() => setDeleteModal(!deleteModal)}>🗑️Delete</button>
              </div>
              : <></>
            }

            {deleteModal && (
            <div className="fixed z-5 top-0 left-0 w-full h-full bg-black bg-opacity-40">
              <div className="bg-white w-2/5 mx-auto mt-32 rounded-md border border-gray-300 z-10 p-8">
                <span
                  className="text-gray-500 text-right text-2xl block cursor-pointer p-4"
                  onClick={() => setDeleteModal(!deleteModal)}
                >
                  ×
                </span>
                <div>
                  <div className="p-2 flex flex-col items-center justify-center">
                    <h4 className="font-bold">Are you sure you want to delete this comment?</h4>
                  </div>
                  <div className="p-2 flex items-center justify-center">
                    <button className="text-center bg-green-500 mt-4 mr-2 text-white text-lg rounded p-2" onClick={() => deleteCommentHandler(commentId)}>Yes, I Do!</button>
                    <button className="text-center bg-rose-600 mt-4 mr-2 text-white text-lg rounded p-2" onClick={() => setDeleteModal(!deleteModal)}>Nah just kidding 😆</button>
                  </div>
                </div>   
              </div>
          </div>
          )}
          {editModal && (
            <div className="fixed z-5 top-0 left-0 w-full h-full bg-black bg-opacity-40">
              <div className="bg-white w-2/5 mx-auto mt-32 rounded-md border border-gray-300 z-10 p-8">
                <span
                  className="text-gray-500 text-right text-2xl block cursor-pointer p-4"
                  onClick={() => setEditModal(!editModal)}
                >
                  ×
                </span>
                <div>
                  <div className="p-2 flex flex-col items-center justify-center">
                    <h4 className="font-bold">Edit comment</h4>
                  </div>
                  <div>
                    <input
                      className="w-full p-2 mr-2 focus:outline-none rounded shadow-gray shadow-lg"
                      placeholder={commentText}
                      value={commentText}
                      onChange={(e) => {setCommentText(e.target.value)}}
                    />
                  </div>
                  <div className="p-2 flex items-center justify-center">
                    <button className="text-center bg-green-500 mt-4 mr-2 text-white text-lg rounded p-2" onClick={() => editCommentHandler(commentId)}>Edit comment</button>
                    <button className="text-center bg-rose-600 mt-4 mr-2 text-white text-lg rounded p-2" onClick={() => { setCommentText(comment); setEditModal(!editModal) }}>Cancel</button>
                  </div>
                </div>   
              </div>
          </div>
          )}
          </>
          : null
      }
    </>
  );
}

export default CommentComponent;

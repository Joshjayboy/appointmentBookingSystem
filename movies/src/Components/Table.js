import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Head = "text-xs text-left text-subMain font-semibold px-6 py-2 uppercase";
const Text =
  "text-sm text-left leading-6 whitespace-nowrap px-5 py-3 text-black";

// rows
const Rows = (book, i) => {
  console.log("this is rows", book);
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={book?.imgUrl ? book?.imgUrl : "/images/user.png"}
            alt="this is image"
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{book?.names}</td>
      <td className={`${Text}`}>{book?.txtVal}</td>
      <td className={`${Text}`}>{book?.startTime}</td>
      <td className={`${Text}`}>{book?.endTime}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        <>
          <Link className="border border-border bg-dry flex-rows gap-2 text-white rounded py-1 px-2">
            Edit <FaEdit className="text-green-500" />
          </Link>
          <button className="bg-delete text-white rounded flex-colo w-6 h-6">
            <MdDelete />
          </button>
        </>
      </td>
    </tr>
  );
};

//   table
function Table({ values }) {
  console.log("this is table", values);
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Date
            </th>
            <th scope="col" className={`${Head}`}>
              Start Time
            </th>
            <th scope="col" className={`${Head}`}>
              End Time
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {values.map((book, i) => Rows(book, i, values))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

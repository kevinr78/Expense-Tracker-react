import React from 'react'

export default function DataVisualizer() {
  return (
    <div className='shadow-lg w-1/2 '>
      <h1 className='text-4xl font-bold mb-4'>Data Visualizer</h1>
        <div className="overflow-x-auto">
            <table className="table">
            {/* head */}
           {/*  <thead>
                <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                </tr>
            </thead> */}
            <tbody>
                {/* row 1 */}
                <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                </tr>
                <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                </tr>
                <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                </tr>
                <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
  )
}

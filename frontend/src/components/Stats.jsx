import React from 'react'
import { Users, Building2, Calendar, TrendingUp, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react';
function Stats() {
  return (
    <div className="flex flex-col justify-start items-center w-full h-full  gap-2">
        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">1,248</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
                <Users className="text-purple-600" size={24} />
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Facility Owners</p>
                <p className="text-3xl font-bold text-gray-800">156</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="text-blue-600" size={24} />
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">4,521</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="text-green-600" size={24} />
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Active Courts</p>
                <p className="text-3xl font-bold text-gray-800">342</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="text-orange-600" size={24} />
            </div>
            </div>
        </div>

        <div>rest for kpis</div>
    </div>
  )
}

export default Stats
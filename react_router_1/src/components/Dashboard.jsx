const Dashboard = ({user})=>{
    return (
        <div>Welcome {user?user:''}</div>
    );
}

export default Dashboard;
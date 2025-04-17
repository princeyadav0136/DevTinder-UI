const UserCard = ({handleSendRequest = () => {},user}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={user?.photoUrl}
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
            {user?.firstName} {user?.lastName}
        </h2>
        <p>
            {user?.about}
        </p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", user?._id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", user?._id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

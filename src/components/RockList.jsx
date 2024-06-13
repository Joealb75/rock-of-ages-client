import { useEffect } from "react";

export const RockList = ({ rocks, fetchRocks, showAll }) => {
  useEffect(() => {
    fetchRocks(showAll);
  }, [showAll]); // When the route changes update fetchRocks


  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          <div>
            {rock.name} ({rock.type.label} ) Weighs: {rock.weight}
          </div>
          <div>
            Owned By: {rock.user.first_name} {rock.user.last_name}
          </div>
          {
            showAll
              ? "" // | ? = when showAll = true - when its true dont render anything
                  // When it is false - render this
              : <div> 
              <button
                className="border border-solid bg-red-700 text-white p-1"
                onClick={async () => {
                  const response = await fetch(`http://localhost:8000/rocks/${rock.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                  }
                  })
                  if (response.status == 204){
                    fetchRocks(showAll)
                  }
                }}
              > 
                Delete</button>
            </div>
          }
          
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};
// {rock.user.first_name} {rock.user.last_name}
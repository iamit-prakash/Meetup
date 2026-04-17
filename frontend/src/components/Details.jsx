import {useParams} from "react-router-dom"
import useFetch from "../useFetch"
import Header from "./Header"


const Details = () => {
    const {id} = useParams()
console.log(id)

const { data, loading, error } = useFetch(`http://localhost:3000/meetups/id/${id}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
 
   return(
    <>
    <Header />
    <main className="container py-4">
    <div className="row g-4 align-items-start">
        <div className="col-lg-8">
         <h1>{data?.title}</h1>
        <p className="mb-1">Hosted By:</p>
        <strong>{data?.host}</strong>
        
        <img 
           src={data?.imageUrl}
           alt={data?.title}
           className="img-fluid rounded my-4 w-100"
        />

        <h3>Details:</h3>
        <p>{data?.details}</p>

        <h3>Additional Information:</h3>
        <p><strong>Dress Code:</strong> {data?.dressCode}</p>
        <p><strong>Age Restrictions:</strong> {data?.ageRestrictions}</p>

        <h3>Event Tags:</h3>
        <div className="d-flex gap-2 flex-wrap">
         {
            data?.eventTags?.map((tag, index)=> (
                <span key={index} className="badge bg-danger">
                  {tag}
                </span>
            ))
         }
        </div>
        </div>

        <div className="col-lg-4">
            <div className="card p-3 mb-4 shadow-sm">
            <p>
                <strong>Data:</strong>  {data?.date}
            </p>
            <p>
                <strong>Time:</strong> {data?.startTime} to {data?.endTime}
              </p>

              <p>
                <strong>Venue:</strong> {data?.venue}
              </p>

              <p>
                <strong>Address:</strong> {data?.address}
              </p>

              <p>
                <strong>Price:</strong> ₹ {data?.price}
              </p>
            </div>
             <div className="row g-3">
              {data?.speakers?.map((speaker) => (
                <div className="col-6" key={speaker._id}>
                  <div className="card text-center p-2 shadow-sm h-100">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="rounded-circle mx-auto mb-2"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover"
                      }}
                    />

                    <strong>{speaker.name}</strong>
                    <small>{speaker.role}</small>
                  </div>
                </div>
              ))}
            </div>

            </div>
        </div>
    </main>
    </>
   )
}

export default Details;


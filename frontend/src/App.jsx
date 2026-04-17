import "bootstrap/dist/css/bootstrap.min.css"
import useFetch from "./useFetch"
import { Link } from "react-router-dom"
import Header from "./components/Header"
import { useState } from "react"

const Meetups = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [eventFilter, setEventFilter] = useState("All")

  const { data, loading, error } = useFetch(
    "http://localhost:3000/meetups"
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const finalFiltered = data?.filter((event) => {
    const text = searchTerm.trim().toLowerCase()

    // Search filter
    const matchesSearch =
      text === "" ||
      event.title?.toLowerCase().includes(text) ||
      event.eventTags?.some((tag) =>
        tag.toLowerCase().includes(text)
      )

    // Event type filter
    const matchesType =
      eventFilter === "All" ||
      event.eventType === eventFilter

    return matchesSearch && matchesType
  })
  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Meetup Events</h2>

          <select
            id="eventFilter"
            className="form-select w-auto"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="All">All Events</option>
            <option value="Online Event">Online</option>
            <option value="Offline Event">Offline</option>
          </select>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {finalFiltered?.map((meetup) => (
            <div className="col" key={meetup._id}>
              <div className="card h-100 position-relative">
                <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2">
                  {meetup.eventType}
                </span>

                <img
                  src={meetup.imageUrl}
                  className="card-img-top"
                  alt={meetup.title}
                />

                <div className="card-body">
                  <p>
                    {meetup.date} {meetup.startTime}
                  </p>

                  <h5>{meetup.title}</h5>

                  <Link
                    to={`/${meetup._id}`}
                    className="btn btn-primary w-100"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Meetups;
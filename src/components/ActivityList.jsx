import { useState, useEffect } from 'react'
import { skapi } from '../skapi.js'
import { ACTIVITY_LABELS } from './ActivityForm'
import './ActivityList.css'

function ActivityList({ refreshTrigger }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [startKey, setStartKey] = useState(null)
  const [endOfList, setEndOfList] = useState(false)

  const fetchActivities = async (fetchMore = false) => {
    try {
      setLoading(true)
      setError('')

      const query = {
        table: { name: 'activities', access_group: 'private' }
      }

      if (filter !== 'all') {
        query.tag = filter
      }

      // Query by $uploaded reserved keyword for sorting by upload time
      // This works on all records regardless of custom indexes
      query.index = {
        name: '$uploaded',
        value: 0,
        condition: '>'
      }

      const fetchOptions = {
        ascending: false,
        limit: 20
      }

      if (fetchMore && startKey) {
        fetchOptions.startKey = startKey
      }

      const response = await skapi.getRecords(query, fetchOptions)
      
      console.log('Query:', query)
      console.log('Response:', response)
      console.log('Records found:', response.list?.length || 0)
      
      if (fetchMore) {
        setActivities(prev => [...prev, ...response.list])
      } else {
        setActivities(response.list || [])
      }

      setStartKey(response.startKey)
      setEndOfList(response.endOfList)
    } catch (err) {
      setError(err.message || 'Failed to fetch activities')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setStartKey(null)
    setEndOfList(false)
    fetchActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, refreshTrigger])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (hours) => {
    if (!hours) return ''
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    if (h === 0) return `${m}m`
    if (m === 0) return `${h}h`
    return `${h}h ${m}m`
  }

  const deleteActivity = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) {
      return
    }

    try {
      await skapi.deleteRecords({ record_id: recordId })
      setActivities(activities.filter(a => a.record_id !== recordId))
    } catch (err) {
      setError(err.message || 'Failed to delete activity')
    }
  }

  const activityTypes = Object.keys(ACTIVITY_LABELS)

  if (loading && activities.length === 0) {
    return (
      <div className="activity-list-container">
        <div className="loading">Loading activities...</div>
      </div>
    )
  }

  return (
    <div className="activity-list-container">
      <div className="activity-list-header">
        <h2>Your Activities</h2>
        <div className="filter-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Activities</option>
            {activityTypes.map(type => (
              <option key={type} value={type}>
                {ACTIVITY_LABELS[type]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activities.length === 0 ? (
        <div className="empty-state">
          <p>No activities found. Start tracking your habits!</p>
        </div>
      ) : (
        <>
          <div className="activities-grid">
            {activities.map((activity) => {
              const data = activity.data || {}
              return (
                <div key={activity.record_id} className="activity-card">
                  <div className="activity-header">
                    <span className="activity-type">
                      {ACTIVITY_LABELS[data.activityType] || data.activityType}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteActivity(activity.record_id)}
                      title="Delete activity"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="activity-date">
                    {formatDate(data.timestamp)}
                  </div>

                  {data.company && (
                    <div className="activity-info">
                      <strong>Company:</strong> {data.company}
                    </div>
                  )}

                  {data.position && (
                    <div className="activity-info">
                      <strong>Position:</strong> {data.position}
                    </div>
                  )}

                  {data.duration && (
                    <div className="activity-duration">
                      Duration: {formatDuration(data.duration)}
                    </div>
                  )}

                  <div className="activity-description">
                    {data.description}
                  </div>
                </div>
              )
            })}
          </div>

          {!endOfList && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={() => fetchActivities(true)}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ActivityList


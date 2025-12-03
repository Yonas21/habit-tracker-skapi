import { useState } from 'react'
import { skapi } from '../skapi.js'
import './ActivityForm.css'

const ACTIVITY_TYPES = {
  JOB_APPLICATION: 'job_application',
  JOB_INTERVIEW: 'job_interview',
  JOB_SHORTLIST: 'job_shortlist',
  JOB_OFFER: 'job_offer',
  APPLICATION_TIME: 'application_time',
  EDUCATION: 'education',
  LEISURE: 'leisure',
  HOLIDAY: 'holiday',
  FRIENDS: 'friends',
  HOUSE_CHORES: 'house_chores',
  SLEEP: 'sleep',
  WALK: 'walk',
  OTHER: 'other'
}

const ACTIVITY_LABELS = {
  [ACTIVITY_TYPES.JOB_APPLICATION]: 'Job Application Sent',
  [ACTIVITY_TYPES.JOB_INTERVIEW]: 'Job Interview',
  [ACTIVITY_TYPES.JOB_SHORTLIST]: 'Job Shortlist',
  [ACTIVITY_TYPES.JOB_OFFER]: 'Job Offer Received',
  [ACTIVITY_TYPES.APPLICATION_TIME]: 'Application Time (Cover Letter/Form)',
  [ACTIVITY_TYPES.EDUCATION]: 'Education/Recap',
  [ACTIVITY_TYPES.LEISURE]: 'Leisure Time',
  [ACTIVITY_TYPES.HOLIDAY]: 'Holiday',
  [ACTIVITY_TYPES.FRIENDS]: 'Talking to Friends',
  [ACTIVITY_TYPES.HOUSE_CHORES]: 'House Chores',
  [ACTIVITY_TYPES.SLEEP]: 'Sleep',
  [ACTIVITY_TYPES.WALK]: 'Walk/Exercise',
  [ACTIVITY_TYPES.OTHER]: 'Other Activity'
}

function ActivityForm({ onActivityAdded, user }) {
  const [activityType, setActivityType] = useState(ACTIVITY_TYPES.JOB_APPLICATION)
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5))
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isJobRelated = [
    ACTIVITY_TYPES.JOB_APPLICATION,
    ACTIVITY_TYPES.JOB_INTERVIEW,
    ACTIVITY_TYPES.JOB_SHORTLIST,
    ACTIVITY_TYPES.JOB_OFFER
  ].includes(activityType)

  const needsDuration = [
    ACTIVITY_TYPES.APPLICATION_TIME,
    ACTIVITY_TYPES.EDUCATION,
    ACTIVITY_TYPES.LEISURE,
    ACTIVITY_TYPES.HOLIDAY,
    ACTIVITY_TYPES.FRIENDS,
    ACTIVITY_TYPES.HOUSE_CHORES,
    ACTIVITY_TYPES.SLEEP,
    ACTIVITY_TYPES.WALK,
    ACTIVITY_TYPES.OTHER
  ].includes(activityType)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const activityData = {
        activityType,
        description: description || 'No description provided',
        date,
        time,
        timestamp: new Date(`${date}T${time}`).getTime()
      }

      if (isJobRelated) {
        activityData.company = company || 'Not specified'
        activityData.position = position || 'Not specified'
      }

      if (needsDuration && duration) {
        activityData.duration = parseFloat(duration) || 0
      }

      const config = {
        table: { name: 'activities', access_group: 'private' },
        tags: [activityType]
      }

      await skapi.postRecord(activityData, config)
      
      setSuccess('Activity added successfully!')
      
      // Reset form
      setDescription('')
      setDuration('')
      setCompany('')
      setPosition('')
      
      if (onActivityAdded) {
        onActivityAdded()
      }
    } catch (err) {
      setError(err.message || 'Failed to add activity')
    } finally {
      setLoading(false)
      setTimeout(() => {
        setSuccess('')
        setError('')
      }, 3000)
    }
  }

  return (
    <div className="activity-form-container">
      <div className="activity-form-card">
        <h2>Add New Activity</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Activity Type *</label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              required
            >
              {Object.entries(ACTIVITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {isJobRelated && (
            <>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Job position"
                />
              </div>
            </>
          )}

          {needsDuration && (
            <div className="form-group">
              <label>Duration (hours)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 2.5"
                step="0.1"
                min="0"
              />
            </div>
          )}

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you did and why (this helps explain your decisions)"
              required
              rows="4"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : 'Add Activity'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ActivityForm
export { ACTIVITY_TYPES, ACTIVITY_LABELS }


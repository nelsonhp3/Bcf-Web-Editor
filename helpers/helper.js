export function convertDate(date,withHour) {
    if (withHour)
        return new Date(date).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric',hour: 'numeric',minute: 'numeric' })
    return new Date(date).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' })
}
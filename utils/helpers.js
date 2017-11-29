import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'mobile-flashcards:notifications'
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
    console.log('createNotification.')
    return {
        title: 'Complete a Quiz',
        body: '👋🏾 Dont forget to complete a quiz for today !',
        ios: {
            sound: true,
        },
        android : {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
console.log('setLocalNotification')
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data)=> {
            console.log('~AsyncStorage.getItem',data)
            if(data === null ) {
                console.log('Permissions.askAsync',data)
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status })=> {
                        console.log('Permissions.askAsync status',status)

                        if( status ==='granted') {
                            console.log('cancelAllScheduledNotificationsAsync')

                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(8)
                            tomorrow.setMinutes(0)
                            console.log('scheduleLocalNotificationsAsync',tomorrow)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            console.log('FINBAL ----AsyncStorage.setItem')

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                            AsyncStorage.getItem(NOTIFICATION_KEY)
                                .then(JSON.parse)
                                .then((data)=> {
                                    console.log('###AsyncStorage.getItem NOTIFICATION_KEY',NOTIFICATION_KEY)
                                    console.log('####AsyncStorage.getItem data',data)
                            })
                        }
                    })
            } else {
                console.log('Notificationsdata is not null',data)
            }

        })
}

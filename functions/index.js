const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

exports.myFunction = onDocumentCreated("chat/{messageId}", async (event) => {
  const data = event.data.data(); // this is equivalent to snapshot.data()
  
  await getMessaging().send({
    notification: {
      title: data.username,
      body: data.text,
    },
    data: {
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
    },
    topic: 'chat',
  });
});

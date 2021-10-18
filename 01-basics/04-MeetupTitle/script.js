import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
createApp({
  data() {
    return {
      currentId: 1,
      currentMeetup: null,
    };
  },
  watch: {
    currentId(newValue) {
      fetchMeetupById(newValue).then((res) => {
        this.currentMeetup = res.title;
      });
    },
  },
  mounted() {
    fetchMeetupById(this.currentId).then((res) => {
      this.currentMeetup = res.title;
    });
  },
}).mount('#app');

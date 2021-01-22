<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="mt-3">Photos Gallery</h1>

          <div v-for="(pic, index) in pictures" v-bind:key="index + '-pic'" class="card mb-5">

            <img :src="pic.photoURL" :alt="pic.author" class="card-img-top">

            <div class="card-body">
              <h5 class="card-title">
                {{ pic.author }}
              </h5>
            </div>

          </div>

          <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Photos',
  components: {
    InfiniteLoading
  },
  data() {
    return {
      pictures: [],
      lastDocSnapshot: null
    }
  },
  methods: {
    async fetchPictures() {
      const db = firebase.firestore()
      let picturesRef = db.collection('pictures').limit(10)

      if (this.lastDocSnapshot) {
        picturesRef = picturesRef.startAfter(this.lastDocSnapshot)
      }

      const picturesSnap = await picturesRef.get()
      this.lastDocSnapshot = picturesSnap.docs[picturesSnap.docs.length - 1]
      const result = picturesSnap.docs.map(p => p.data())

      this.pictures.push(...result)

      return result.length
    },
    async infiniteHandler($state) {
      const newPicturesCount = await this.fetchPictures()

      if (newPicturesCount > 0) {
        return $state.loaded() // More pictures to come
      }

      return $state.complete() // Done with the pictures
    }
  }
}
</script>

<style scoped>

</style>

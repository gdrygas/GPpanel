import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// realtime firebase
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})

fb.subjectsCollection.orderBy('createdOn', 'asc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setSubjects', postsArray)
})

fb.articlesCollection.orderBy('createdOn', 'asc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setArticles', postsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    subjects: [],
    articles: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setSubjects(state, val) {
      state.subjects = val
    },
    setArticles(state, val) {
      state.articles = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      user.updateProfile({
        displayName: form.name
      })
      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async createPost({ state, commit }, post) {
      // create post in firebase
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async createSubject({ state, commit }, subject) {

      var dateFormat = require('dateformat')
      var now = new Date()
      var myDate = dateFormat(now, "yyyy/mm/dd HH:MM")
      await fb.subjectsCollection.add({
        createdOn: now,
        content: subject.content,
        title: subject.title,
        type: subject.type,
        userId: fb.auth.currentUser.uid,
        userName: fb.auth.currentUser.displayName,
        dispalyDate: myDate,
        comments: 0,
        likes: 0
      })
    },
    async createArticle({ state, commit }, article) {
      // create post in firebase

      var dateFormat = require('dateformat')
      var now = new Date()
      var myDate = dateFormat(now, "yyyy/mm/dd HH:MM")
      fb.articlesCollection.add({
        createdOn: now,
        content: article.content,
        title: article.title,       
        userId: fb.auth.currentUser.uid,
        userName: fb.auth.currentUser.displayName,
        email:  fb.auth.currentUser.email,
        dispalyDate: myDate,
        comments: 0,
        likes: 0,
        status: article.status,
        subjectId: article.subjectId
      })
      
      
      
    },
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateSubject({ dispatch }, subject) {
      
      // update user object
      const userRef = await fb.subjectsCollection.doc(subject.id).update(subject)

    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  }
})

export default store

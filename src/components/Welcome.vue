<script>
export default {
  name: 'Welcome',
  functional: true,
  render(createElement, { props, data, children }) {
    return createElement('div', { class: 'welcome' }, [
      createElement('div', { props, ...data }, children)
    ])
  }
}
</script>

<style lang="scss" scoped>
.welcome {
  font-size: 50px;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0px;
  & .gradient {
    text-decoration: none;
    background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    -webkit-animation: gradient 2s infinite linear;
    animation: gradient 5s infinite linear;
  }
}
@keyframes gradient {
  0%  {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>

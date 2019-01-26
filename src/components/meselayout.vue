<template>
  <div>
    <svg width="500" height="500">
      <circle cx="150" cy="150" r="40" class="masa"></circle>
      <!-- sateliti -->
      <circle
        v-for="n in Locuri"
        :key="n"
        :cx="calcSatelite(150,150,40,n).x"
        :cy="calcSatelite(150,150,40,n).y"
        r="10"
      ></circle>

      <circle cx="300" cy="150" r="40" class="masa"></circle>
      <!-- sateliti -->
      <circle
        v-for="n in Locuri"
        :key="n"
        :cx="calcSatelite(300,150,50,n).x"
        :cy="calcSatelite(300,150,50,n).y"
        r="10"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: "MeseLayout",
  props: {
    msg: String
  },
  data() {
    return {
      Mese: 2,
      Locuri: 6
    };
  },
  methods: {
    calcSatelite(ParentX, ParentY, ParentR, LocNr) {
      var angle, X, Y;

      angle = (LocNr / (this.Locuri / 2)) * Math.PI;
      X = ParentR * Math.cos(angle);
      Y = ParentR * Math.sin(angle);
      return { x: X + ParentX, y: Y + ParentY };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  border: solid 1px black;
}
.masa {
  stroke: green;
  stroke-width: 4;
  fill: yellow;
}
</style>

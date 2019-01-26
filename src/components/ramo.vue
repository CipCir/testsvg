<template>
  <div>
    <svg width="500" height="500">
      <g v-for="(masa,index) in MeseData" :key="index">
        <circle :id="masa.id" :cx="masa.x" :cy="masa.y" :r="DeffMasa.r" class="masa"></circle>
        <!-- sateliti -->
        <g v-for="(loc,indexy) in masa.locuri" :key="indexy">
          <circle
            :id="loc.id"
            :cx="calcSatelite(masa.x,masa.y,indexy).x"
            :cy="calcSatelite(masa.x,masa.y,indexy).y"
            :r="DeffLoc.r"
            @click="LocClick(loc)"
          ></circle>
          <text
            v-if="loc.inv!=''"
            :x="calcText(masa.x,masa.y,indexy,loc.inv).x"
            :y="calcText(masa.x,masa.y,indexy,loc.inv).y"
            fill="red"
          >{{loc.inv}}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MeseLayout',
  props: {
    msg: String
  },
  data () {
    return {
      Mese: 2,
      Locuri: 10,
      MesePoz: [{ x: 100, y: 120 }, { x: 400, y: 120 }],
      DeffMasa: { r: 40 },
      DeffLoc: { r: 10, dist: 20 },
      MeseData: []
    }
  },
  created () {
    var vueOBJ = this
    for (var i = 1; i <= this.Mese; i++) {
      const data = {
        id: 'M' + i,
        x: vueOBJ.MesePoz[i - 1].x,
        y: vueOBJ.MesePoz[i - 1].y,
        locuri: []
      }
      for (var j = 1; j <= vueOBJ.Locuri; j++) {
        const locObj = {
          id: 'M' + i + 'L' + j,
          inv: 'MautziMau mau'
        }
        data.locuri.push(locObj)
      }
      vueOBJ.MeseData.push(data)
    }
  },
  methods: {
    calcSatelite (ParentX, ParentY, LocNr) {
      var angle, X, Y
      var distFromParent = this.DeffLoc.dist

      angle = (LocNr / (this.Locuri / 2)) * Math.PI
      X = (this.DeffMasa.r + distFromParent) * Math.cos(angle)
      Y = (this.DeffMasa.r + distFromParent) * Math.sin(angle)
      return { x: X + ParentX, y: Y + ParentY }
    },
    calcText (ParentX, ParentY, LocNr, txt) {
      var angle
      var X
      var Y
      var correctionX = 15
      var correctionY = 13
      var distFromParent = this.DeffLoc.dist

      angle = (LocNr / (this.Locuri / 2)) * Math.PI
      X = (this.DeffMasa.r + distFromParent) * Math.cos(angle)
      Y = (this.DeffMasa.r + distFromParent) * Math.sin(angle)
      if (X < 0) correctionX = -correctionX
      if (Y < 0.1 && Y > -0.1) correctionY = correctionY / 10
      if (Y < 0) correctionY = -correctionY
      if (X < 0) correctionX = correctionX - txt.length * 6
      return {
        x: X + ParentX + correctionX,
        y: Y + ParentY + correctionY
      }
    },
    LocClick (loc) {
      console.log(loc)
      loc.inv = 'axxc nlk'
    }
  }
}
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
text {
  font-size: 10px;
}
</style>

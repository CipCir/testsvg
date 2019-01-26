<template>
  <div>
    <svg width="800" height="800">
    <g
      v-for="(masa,indM) in MeseData"
      :key="indM">

      <circle :id="masa.id" :cx="masa.x" :cy="masa.y" :r="DeffMasa.r" class="masa"></circle>
      <!-- sateliti -->
      <g
        v-for="(loc,indL) in masa.locuri"
        :key="indL">
        <circle
          :id="loc.id"
          :cx="calcSatelite(masa.x,masa.y,indL).x"
          :cy="calcSatelite(masa.x,masa.y,indL).y"
          :r="DeffLoc.r"
          class="clickable"
          :class="{'ocupat':loc.inv!=''}"
          @click="LocClick(indM,indL,loc)"
        ></circle>
        <text
        v-if="loc.inv!=''"
        :x="calcText(masa.x,masa.y,indL,loc.inv).x"
            :y="calcText(masa.x,masa.y,indL,loc.inv).y"
         fill="red">{{loc.inv}}
        </text>
      </g>
    </g>
    </svg>
    <div v-if="Stage.showRemain">
      <span class="listOm clickable" v-for="(om,i) in invRamasi" :key="i" @click="AddToLoc(om)">{{om.nume}}</span>
    </div>
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
      Mese: 3,
      Locuri: 10,
      Stage: { showRemain: false },
      MesePoz: [{ x: 120, y: 100 }, { x: 600, y: 100 }, { x: 150, y: 300 }],
      DeffMasa: { r: 30 },
      DeffLoc: { r: 10, dist: 20 },
      MeseData: [],
      InvArr: [
        { id: 'om1', nume: 'Gigel', masa: 1, loc: 1 },
        { id: 'om2', nume: 'Marian', masa: '', loc: '' },
        { id: 'om3', nume: 'Adi', masa: 2, loc: 8 },
        { id: 'om4', nume: 'Adsdi', masa: '', loc: '' },
        { id: 'om5', nume: 'Adiffs', masa: '', loc: '' },
        { id: 'om6', nume: 'Maka', masa: '', loc: '' }
      ],
      Transfer: {}
    }
  },
  created () {
    this.generateMeseData()
    this.populate()
  },
  methods: {
    generateMeseData () {
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
            inv: '',
            omID: ''
          }
          data.locuri.push(locObj)
        }
        vueOBJ.MeseData.push(data)
      }
    },
    populate () {
      var vueOBJ = this
      this.InvArr.forEach(om => {
        if (om.loc !== '') {
          vueOBJ.MeseData[om.masa - 1].locuri[om.loc - 1].inv = om.nume
          vueOBJ.MeseData[om.masa - 1].locuri[om.loc - 1].omID = om.id
        }
      })
    },
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
      if (X < 0) correctionX = correctionX - txt.length * 10
      return {
        x: X + ParentX + correctionX,
        y: Y + ParentY + correctionY
      }
    },
    LocClick (indMasa, indloc, loc) {
      // console.log(loc)
      // reset
      if (loc.inv !== '') {
        if (window.confirm('Are you sure u want to remove')) {
          this.MeseData[indMasa].locuri[indloc].inv = ''
          let target = this.InvArr.find(om => {
            return om.id === loc.omID
          })
          target.masa = ''
          target.loc = ''
        } else {
          return false
        }
      }
      this.Stage.showRemain = true
      this.Transfer.masa = indMasa
      this.Transfer.loc = indloc
      // loc.inv = 'axxc nlk'
    },
    AddToLoc (om) {
      this.MeseData[this.Transfer.masa].locuri[this.Transfer.loc].inv = om.nume
      this.MeseData[this.Transfer.masa].locuri[this.Transfer.loc].omID = om.id
      om.masa = this.Transfer.masa + 1
      om.loc = this.Transfer.loc + 1
      this.Transfer = {}
      this.Stage.showRemain = false
    }
  },
  computed: {
    invRamasi () {
      return this.InvArr.filter(om => {
        return om.loc === ''
      })
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
.loc{
  cursor: pointer;
}
.ocupat{
  fill: cadetblue
}
.clickable{
  cursor: pointer;
}
.listOm{
     margin: 5px;
    background-color: aqua;
    padding: 5px;
    border-radius: 10px;
}
div .listOm{
  margin-top: 10px
}
</style>

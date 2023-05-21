<template>
  <div>
    <Alert
      :notifdanger="$root.notifdanger"
      :notifsuccess="$root.notifsuccess"
      :textNotif="$root.textNotif"
    />
    <div class="k-main-content">
      <div class="k-card" v-if="defaultDisplay">
        <div class="mb-5">
          <v-row justify="space-between" align="center">
            <v-col cols="6">
              <h3>Data Orders</h3>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn class="btn-black" rounded @click="defaultDisplay = false">
                Add Orders
                <v-icon right dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <div class="table-area">
          <v-data-table
            :headers="headers"
            :items="datarow"
            :loading="isLoading"
            :search="search"
            loading-text="Loading... Please wait"
          >
            <template v-slot:[`item.Action`]="{ item }">
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mr-1"
                      color="primary"
                      fab
                      x-small
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="seeDetail(item)"
                    >
                      <v-icon color="white" small> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  <span>See Detail</span>
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
      <!-- Add Orders section -->
      <div class="k-card" v-if="!defaultDisplay && !detailSection">
        <div class="mb-5">
          <h3>Add Order</h3>
        </div>
        <v-form class="f-form">
          <v-row>
            <v-col cols="6">
              <div class="f-label">Consignee Name</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee Name"
                v-model="consigneeName"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <div class="f-label">Consignee Number</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee Number"
                v-model="consigneeNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="f-label">Consignee Address</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee Address"
                v-model="consigneeAddress"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="f-label">Consignee City</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee City"
                v-model="consigneeCity"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="f-label">Consignee Province</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee Province"
                v-model="consigneeProvince"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="f-label">Consignee Country</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee Country"
                v-model="consigneeCountry"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="f-label">Consignee Postal Code</div>
              <v-text-field
                outlined
                placeholder="Enter Consignee Postal Code"
                v-model="consigneePostalCode"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <div class="f-label">Payment Type</div>
              <v-select
                v-model="paymentType"
                :items="paymentList"
                item-text="text"
                item-value="value"
                outlined
                placeholder="Choose Payment Type"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <div class="f-label">Weight</div>
              <v-text-field
                outlined
                placeholder="Enter Weight"
                v-model="weight"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <div class="f-label">Height</div>
              <v-text-field
                outlined
                placeholder="Enter Height"
                v-model="height"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <div class="f-label">Length</div>
              <v-text-field
                outlined
                placeholder="Enter Length"
                v-model="length"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <div class="f-label">Width</div>
              <v-text-field
                outlined
                placeholder="Enter Width"
                v-model="width"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <div class="mt-8" style="width: 50%">
          <v-row>
            <v-col cols="6">
              <v-btn
                block
                elevation="0"
                rounded
                class="btn-black"
                :loading="isLoading"
                :disabled="
                  !consigneeName ||
                  !consigneeNumber ||
                  !consigneeAddress ||
                  !consigneeCity ||
                  !consigneeProvince ||
                  !consigneeCountry ||
                  !paymentType ||
                  !weight ||
                  !height ||
                  !length ||
                  !width ||
                  !consigneePostalCode
                "
                @click="submit()"
                >Save</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                elevation="0"
                rounded
                class="btn-white-ot"
                @click="defaultDisplay = true"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </div>
      <!-- Detail Order section -->
      <div class="k-card" v-if="detailSection">
        <div class="mb-5">
          <v-row justify="space-between" align="center">
            <v-col cols="6">
              <h3>{{ selectedItem.ConsigneeName }} Order</h3>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn
                class="btn-white"
                rounded
                @click="(defaultDisplay = true), (detailSection = false)"
              >
                <v-icon left dark> mdi-chevron-left </v-icon>
                Back
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <hr class="mb-5" />
        <v-row>
          <v-col cols="6">
            <table>
              <tr>
                <td>Tracking ID</td>
                <td>: {{ selectedItem.TrackingNumber }}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>: {{ selectedItem.ConsigneeName }}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>: {{ selectedItem.ConsigneeAddress }}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>: {{ selectedItem.ConsigneeCity }}</td>
              </tr>
              <tr>
                <td>Province</td>
                <td>: {{ selectedItem.ConsigneeProvince }}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>: {{ selectedItem.ConsigneeCountry }}</td>
              </tr>
              <tr>
                <td>Postal Code</td>
                <td>: {{ selectedItem.ConsigneePostalCode }}</td>
              </tr>
            </table>
          </v-col>
          <v-col cols="6">
            <table>
              <tr>
                <td>Payment Type</td>
                <td>: {{ selectedItem.PaymentType }}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>: {{ selectedItem.Weight }}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>: {{ selectedItem.Height }}</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>: {{ selectedItem.Length }}</td>
              </tr>
              <tr>
                <td>Width</td>
                <td>: {{ selectedItem.Width }}</td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
export default {
  name: "UsersList",

  components: {
    Alert,
  },

  data() {
    return {
      dialog: false,
      defaultDisplay: true,
      detailSection: false,
      isLoading: false,
      search: "",
      headers: [
        {
          text: "Tracking ID",
          align: "start",
          value: "TrackingNumber",
          sortable: false,
        },
        { text: "Name", value: "ConsigneeName" },
        { text: "Address", value: "ConsigneeAddress" },
        { text: "City", value: "ConsigneeCity" },
        { text: "Province", value: "ConsigneeProvince" },
        { text: "Payment", value: "PaymentType" },
        { text: "Action", value: "Action" },
      ],

      // table data
      datarow: [],
      selectedItem: {},

      paymentList: [
        { text: "COD", value: "cod" },
        { text: "Prepaid", value: "prepaid" },
      ],

      // add data
      trackingNumber: "",
      consigneeAddress: "",
      consigneeName: "",
      consigneeNumber: "",
      consigneeCity: "",
      consigneeProvince: "",
      consigneePostalCode: "",
      consigneeCountry: "",
      paymentType: "",
      weight: "",
      height: "",
      width: "",
      length: "",
    };
  },

  methods: {
    seeDetail(item) {
      this.detailSection = true;
      this.defaultDisplay = false;
      this.selectedItem = item;
    },
    getDataTable() {
      this.isLoading = true;
      this.$root
        .axios({
          method: "get",
          url: `/orders`,
        })
        .then((res) => {
          if (res.data.data) {
            this.datarow = res.data.data;
          }
          return;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    submit() {
      this.isLoading = true;
      var data = {
        consigneeName: this.consigneeName,
        consigneeNumber: this.consigneeNumber,
        consigneeAddress: this.consigneeAddress,
        consigneeCity: this.consigneeCity,
        consigneeProvince: this.consigneeProvince,
        consigneePostalCode: this.consigneePostalCode,
        consigneeCountry: this.consigneeCountry,
        paymentType: this.paymentType,
        weight: parseFloat(this.weight),
        height: parseFloat(this.height),
        length: parseFloat(this.length),
        width: parseFloat(this.width),
      };
      this.$root
        .axios({
          method: "post",
          url: `/orders`,
          data: data,
        })
        .then((res) => {
          if (!res.data.error) {
            this.$root.alert("Data created successfully", "success");
            this.defaultDisplay = true;
            this.getDataTable();
          } else {
            this.$root.alert(res.data.error, "danger");
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.getDataTable();
  },
};
</script>

<style lang="scss" scoped>
table {
  td {
    padding: 4px 0 !important;
  }
  td:first-child {
    padding-right: 12px !important;
  }
}
</style>

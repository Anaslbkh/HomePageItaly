<template>
    <div>
        <div
            :class="`help-btn${(['de', 'de-at'].includes($currentLanguage.lang) ? ' offset-right-desktop' : '')}`"
            @click="load()"
        >
        <!--
          @TODO
          default: style="opacity: 0;"
          document ready: $('.help-btn').animate({opacity: 1 }, 500);

          when not this.isLoading: $('.help-btn').find('.svg-icon').removeClass('svg-loading_white svg-xxl').addClass('svg-help svg-xl');
          when this.isLoading: $('.help-btn').find('.svg-icon').addClass('svg-loading_white svg-xxl').removeClass('svg-help svg-xl');
        -->
            <div class="help-icon">
                <div class="svg-icon svg-xl svg-help"></div>
            </div>
            <div class="help-text font-roboto">
                {{ $i18n('general.help') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Zendesk from '@dansmaculotte/nuxt-zendesk'

Vue.use(Zendesk)

export default Vue.extend({
  data(): {
    loadedZE: boolean,
    isLoading: boolean,
  } {
    return {
      loadedZE: false,
      isLoading: false,
    }
  },
  methods: {
    load() {
      // @ts-ignore
      this.$zendesk.load(process.env.ZENDESK_KEY)
      // @ts-ignore
      this.$zendesk.zE('webWidget', 'show')
      /* original implementation below
      if (! process.client) {
        return
      }

      if (this.loadedZE === false) {
        this.isLoading = true
        console.log('load ZE', this.loadedZE, this.isLoading)

        // @ts-ignore
        window.zEmbed ||
        (function (e, t) {
            // @ts-ignore
            var n, o, d, i, s, a = [], r = document.createElement('iframe');
            // @ts-ignore
            (window.zEmbed = function () {
                a.push(arguments);
            }),
            // @ts-ignore
                (window.zE = window.zE || window.zEmbed),
                (r.src = 'javascript:false'),
                (r.title = ''),
                // @ts-ignore
                (r.role = 'presentation'),
                // @ts-ignore
                ((r.frameElement || r).style.cssText = 'display: none'),
                (d = document.getElementsByTagName('script')),
                (d = d[d.length - 1]),
                // @ts-ignore
                d.parentNode.insertBefore(r, d),
                (i = r.contentWindow),
                // @ts-ignore
                (s = i.document);
            try {
                o = s;
            } catch (e) {
                (n = document.domain),
                    (r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);'),
                    (o = s);
            }
            // @ts-ignore
            (o.open()._l = function () {
                var e = this.createElement('script');
                // @ts-ignore
                n && (document.domain = n),
                    (e.id = 'js-iframe-async'),
                    (e.src = 'https://assets.zendesk.com/embeddable_framework/main.js'),
                    // @ts-ignore
                    (document.t = +new Date()),
                    // @ts-ignore
                    (document.zendeskHost = 'parkos.zendesk.com'),
                    // @ts-ignore
                    (document.zEQueue = a),
                    document.body.appendChild(e);
            }),
                o.write('<body onload="document._l();">'),
                o.close();
        })();

        // @ts-ignore
        zE(function () {
            // @ts-ignore
            zE.setLocale($currentLanguage.lang);
            // var interval = setInterval(function () {
            //     $('#launcher').contents().find('button').trigger('click');
            //     if ($('#webWidget').length > 0 && $('#webWidget').is(':visible')) {
            //         $('.help-btn')
            //             .find('.svg-icon')
            //             .removeClass('svg-loading_white svg-xxl')
            //             .addClass('svg-help svg-xl');
            //         clearInterval(interval);
            //     }
            // }, 200);
        });
        // @ts-ignore
        window.zESettings = {
            webWidget: {
                offset: { horizontal: '-8px' },
            },
        };
        this.loadedZE = true;
        this.isLoading = false;
      } else {
        console.log('already loaded ZE, show launcher', this.loadedZE, this.isLoading)
        // $('#launcher').contents().find('button').trigger('click');
      }
      */
    },
  },
})
</script>



type Platform = {
    name: string; // Nazwa strony/platformy
    url: string; // Adres strony
    logo: string; // Ścieżka do logo lub URL favicon
    login?: string; // Opcjonalny login do strony
  };
  
  const platforms: Platform[] = [
    { name: "Google", url: "google.pl", logo: "https://www.google.com/favicon.ico", login: "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%2F&ec=futura_ctr_og_so_72776761_p&hl=pl&ifkv=AXH0vVvGR35nIgYYLlnt9tOKTZ-FDdc1M1tSFu75HCVz9hcs4nah7LVTa7laIsuwAWfXWPFnMX9P&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1745548176%3A1743400782131711" },
    { name: "YouTube", url: "youtube.com", logo: "https://www.youtube.com/favicon.ico", login: "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dpl%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=pl&ifkv=AXH0vVuKrxTjY7Ime6LwAobCBPO8DmoUI4buCOC2ADWLa3lXdXLZBmtN0isNJnnv-xxcRzWofEBHGQ&passive=true&service=youtube&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1631225750%3A1743400922695637" },
    { name: "Facebook", url: "facebook.com", logo: "https://www.facebook.com/favicon.ico", login: "https://www.facebook.com/login.php" },
    { name: "Allegro", url: "allegro.pl", logo: "https://www.allegro.pl/favicon.ico", login: "https://allegro.pl/logowanie" },
    { name: "Onet", url: "onet.pl", logo: "https://www.onet.pl/favicon.ico", login: "https://konto.onet.pl/signin" },
    { name: "WP", url: "wp.pl", logo: "https://www.wp.pl/favicon.ico", login: "https://poczta.wp.pl/login/login.html" },
    { name: "OLX", url: "olx.pl", logo: "https://www.olx.pl/favicon.ico", login: "https://login.olx.pl/?cc=eyJjYyI6MSwiZ3JvdXBzIjoiQzAwMDE6MSxDMDAwMjoxLEMwMDAzOjEsQzAwMDQ6MSxnYWQ6MSJ9&client_id=6j7elk01p32o648o1io8lvhhab&code_challenge=I0LWH2fufDe0C_5A7W1bso0fa5ghIOk2qGyu3-PeZOo&code_challenge_method=S256&lang=pl&redirect_uri=https%3A%2F%2Fwww.olx.pl%2Fd%2Fcallback%2F&st=eyJzbCI6IjE5NWVhY2I4YWVieDYzODBkMjZlIiwicyI6IjE5NWVhY2I4YWVieDYzODBkMjZlIn0%3D&state=NjY2ZUNQMkxiUjJtYVJ2S1R2RUpHMHRoSVFVU1FJSUh4SWNCN2dnWUtIVw%3D%3D" },
    { name: "Instagram", url: "instagram.com", logo: "https://www.instagram.com/favicon.ico", login: "https://www.instagram.com/" },
    { name: "X", url: "x.com", logo: "https://www.twitter.com/favicon.ico", login: "https://x.com/i/flow/login" },
    { name: "LinkedIn", url: "linkedin.com", logo: "https://www.linkedin.com/favicon.ico", login: "https://www.linkedin.com/login/pl?fromSignIn=true" },
    { name: "Ceneo", url: "ceneo.pl", logo: "https://www.ceneo.pl/favicon.ico" },
    { name: "Interia", url: "interia.pl", logo: "https://www.interia.pl/favicon.ico", login: "https://poczta.interia.pl/logowanie" },
    { name: "Gazeta.pl", url: "gazeta.pl", logo: "https://www.gazeta.pl/favicon.ico", login: "https://oauth.gazeta.pl/poczta" },
    { name: "TVN24", url: "tvn24.pl", logo: "https://www.tvn24.pl/favicon.ico", login: "https://account.tvn.pl/auth/login?redirect_uri=https%3A%2F%2Ftvn24.pl%2Fauthenticate%3FredirectUrl%3Dhttps%253A%252F%252Ftvn24.pl%252F&client_id=Web_TVN24CUE_3345b53f72146663&response_type=code&scope=&state=412f09ffc84728c21aef2f4b2679b8da4362ec9f2994015e2dd384fd67bff781f50d705e87f9eaed7d58d0ea9b45c4e787870347ea0025e600e91b7c7d5857fe&service_id=200&version=2.2.0&device_id=8188571b-7aac-48c0-9dde-74f7bec5169d&config_hash=6264db4e-fed3-47b2-97c9-6193cab63cd9&open_view=login&action=login&oauth_params_hash=53d93253050fffcead26a1ffd5e9bc8d" },
    { name: "Zalando", url: "zalando.pl", logo: "https://www.zalando.pl/favicon.ico", login: "https://accounts.zalando.com/authenticate?redirect_uri=https%3A%2F%2Fwww.zalando.pl%2Fsso%2Fcallback&client_id=fashion-store-web&response_type=code&scope=openid&request_id=GwYaHrX1H3vyOwpk%3A5eae5c5a-af6d-4abd-89c5-088fc97e77cb%3AGwYaHrX1H3vyOwpk&nonce=db060f97-8981-41fb-ad1f-f6efab707196&state=eyJvcmlnaW5hbF9yZXF1ZXN0X3VyaSI6Ii9teWFjY291bnQvPyIsInRzIjoiMjAyNS0wMy0zMVQwNjowOTo1OFoifQ%3D%3D&premise=unified_sso_ui&ui_locales=pl-PL&zalando_client_id=5eae5c5a-af6d-4abd-89c5-088fc97e77cb&tc=zcid%3A5eae5c5a-af6d-4abd-89c5-088fc97e77cb%2Cpf%3Aweb&sales_channel=ca9d5f22-2a1b-4799-b3b7-83f47c191489&client_country=PL&client_category=fs&view=verify-email" },
    { name: "Empik", url: "empik.com", logo: "https://www.empik.com/favicon.ico", login: "https://www.empik.com/logowanie" },
    { name: "Rossmann", url: "rossmann.pl", logo: "https://www.rossmann.pl/favicon.ico", login: "https://www.rossmann.pl/logowanie" },
    { name: "Lidl", url: "lidl.pl", logo: "https://www.lidl.pl/cdn/assets/logos/1.0.1/lidl-logo-shop-cdn.svg", login: "https://accounts.lidl.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fcountry_code%3DPL%26response_type%3Dcode%26client_id%3DPolandEcommerceClient%26scope%3Dopenid%2520profile%2520Lidl.Authentication%2520offline_access%26state%3DgUg15mwXkGroWLJhZvZjRne0DdSDDz0nXFsPatQEnSI%253D%26redirect_uri%3Dhttps%253A%252F%252Fwww.lidl.pl%252Fuser-api%252Fsignin-oidc%26nonce%3DLnd6Mq_N-bb25W3sCpUl2aovSU2hQdNFeATpysQhsyg%26step%3Dlogin%26language%3Dpl-PL#login" },
    { name: "Media Expert", url: "mediaexpert.pl", logo: "https://www.mediaexpert.pl/favicon.ico", login: "https://www.mediaexpert.pl/login" },
    { name: "RTV Euro AGD", url: "euro.com.pl", logo: "https://www.euro.com.pl/favicon.ico", login: "https://www.euro.com.pl/account-login.bhtml" },
    { name: "Pyszne.pl", url: "pyszne.pl", logo: "https://www.pyszne.pl/favicon.ico", login: "https://auth.pyszne.pl/account/login" },
    { name: "Filmweb", url: "filmweb.pl", logo: "https://www.filmweb.pl/favicon.ico" },
    { name: "Player", url: "player.pl", logo: "https://www.player.pl/favicon.ico", login: "https://account.tvn.pl/auth/login/form?redirect_uri=https%3A%2F%2Fplayer.pl%2Fkonto-tvn%2Fauthorization%3Fxfo%3DPORTAL%26portalRedirect%3D%252F&client_id=Web_PlayerFL_b3a76368bd59ce8bca521c90f5197ad6&response_type=code&scope=&state=fb0da8c12296fd7591aa61491e49280d18ae851e5874640a60d044a5854c6e043761499ec8fb17d5471484cc20d5a1af064d5095968c3ef2a165430e7bcc5065&service_id=24&version=2.3.0&device_id=de19d3bd51944854a80fff326b01c01a&config_hash=25d5d314-9cc7-4af9-96cd-f3dd5bde4682&open_view=login&action=login&tcString=CQPIXTAQPIXTAAcABBPLBjFwAP_AAAAAAB5YJQMD_CJ8BSFDYSZ1IIskaAUXwRABxkQhAgLBAwABiBKAOIQAkCAIAABANCAAAAIAMHBAAAFADIAAAAAAIAgAIAAMIAAQAABKAABAAAAAAAAQCAgAAIBAAQAQgmAEAAcAgAAlgAIoAFAAAAhCAACBAAAAEAAFAAEAAAAAAAAIAAAIICwABQAAjAAAAAAAABgQAAAAAAAEAAABYSA-AAsACoAHAAPAAggBkAGgAPAAmABVADeAHoAPwAhABHACaAFaAMMAZQA5wB3AD9ASIAnYBQ4CmwFsALzAZcA2MCDAELwgAUABwAnAC-gP3AhWOgQAALAAqABwAEEAMgA0AB4AEwAKoAYgA3gB6AD8AJoATgArQBhgDKAGiAOcAdwA_QCLAEdAReAkQBOwChwFNgLYAXnAywDLgIMDgA8ADgAPAB-AGgARwBCAH7gQrIQCQAFgBVADEAG8APQA5wB3AKbAgwQACAAPADQAX0CFZKAeAAsADgAPAAmABVADEAI4AVoCLwEiAKbAWwAvMBlgEGCQAIAdwD9ykBsABYAFQAOAAggBkAGgAPAAmABVADEAH4AVoAygBogDnAH6ARYAjoB7QEXgJEATsAocBTYC2AF5wMsAy4CDBQAQAI4ATgA7gD_gKkAVkA_cCFZaAGAO4BQ4CmwA.f_gAAAAAAAAA&consentedDate=Mon+Mar+31+2025+08%3A18%3A50+GMT+0200&groups=C0002%3A1%2CC0004%3A1%2CBG2455%3A1%2CC0003%3A1%2CBG2456%3A1%2CC0001%3A1&oauth_params_hash=93f277a1a19a08c0c5452475eb8587d1" },
    { name: "AliExpress", url: "aliexpress.com", logo: "https://www.aliexpress.com/favicon.ico" },
    { name: "Amazon", url: "amazon.com", logo: "https://www.amazon.com/favicon.ico", login: "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0" },
    { name: "Wikipedia", url: "wikipedia.org", logo: "https://www.wikipedia.org/favicon.ico", login: "https://auth.wikimedia.org/plwiki/wiki/Specjalna:Zaloguj" },
    { name: "Reddit", url: "reddit.com", logo: "https://www.reddit.com/favicon.ico" },
    { name: "Netflix", url: "netflix.com", logo: "https://www.netflix.com/favicon.ico", login: "https://www.netflix.com/pl/login" },
    { name: "TikTok", url: "tiktok.com", logo: "https://www.tiktok.com/favicon.ico", login: "https://www.tiktok.com/login/phone-or-email" },
    { name: "Pinterest", url: "pinterest.com", logo: "https://www.pinterest.com/favicon.ico", login: "https://pl.pinterest.com/login/" },
    { name: "eBay", url: "ebay.com", logo: "https://www.ebay.com/favicon.ico", login: "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&sgfl=gh&ru=https%3A%2F%2Fwww.ebay.com%2F" },
    { name: "Gmail", url: "https://mail.google.com", logo: "https://mail.google.com/favicon.ico", login:"https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=AXH0vVtc8_PGB-0lwjveFVZDlaP-7XNpAg2GYsWY1zfEl7Ny1zcCwL50XbrCK03zD0120_VUYCKgpg&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1628354512%3A1743402487412682" },
    { name: "Microsoft", url: "microsoft.com", logo: "https://www.microsoft.com/favicon.ico", login: "https://login.live.com/oauth20_authorize.srf?client_id=10fa57ef-4895-4ab2-872c-8c3613d4f7fb&scope=openid+profile+offline_access&redirect_uri=https%3a%2f%2fwww.microsoft.com%2fcascadeauth%2faccount%2fsignin-oidc&response_type=code&state=CfDJ8FvuQYIkyaVGvpRcKlrFlVGNYZ1cAcRuJNguAKJnLwA58az765fbDLJn9dtyJRGYW-bQyPrM0xnWXo0aS-R8YRzOtrzY-b95wp92OqA9qX9DHwl_8lK9emKS1xjDkFHF5zrvW5yLtH5p5m3i_bXOjAwfsT_XHMYlwXOM7lDMTaIeGKtczAVoK9tdffYa0-3JTfDSnE4HvIo7OzJ9675QUvhjF0xfWpQw6jWNymRCr0mtFTvrU1G7CvTLrHbRY0tUFTo_urcNqCWDuudmNLLRc3oXNdSvHHUM2Fs-CmmICs1WMxLw9V5m59BminpVquPUrt2y1FpTGAz-IjE4kUxnimp8qqRhjkYbT7w8aEsph145sMzjA4R2gIAHlhx1PluSJL8ieGP94LV3S4hmQm420t4OqQ-qyRYoj2C6jWBPVVDcpRzFqXv17fGPETAUT_OTCoxuJ4ApyCFNdKgTiBpFcWnfqfYBl9c456YnE0ZgoN4D&response_mode=form_post&nonce=638789994554875367.M2E5MDgyMDEtNTNhOC00MWMwLTg0OGItMmFiOTVhYjczNzM5ZDU3NDg5MDctYWU0Mi00NGFmLTg0ZGItZTEwYjZjZDI3NzM4&code_challenge=kZzHk8NDRvYixUBh8npyROjEiJuwo6EhK8KLD44M_CM&code_challenge_method=S256&x-client-SKU=ID_NET6_0&x-client-Ver=8.1.0.0&uaid=b91c6951d2c94ee8adba23745f29cdef&msproxy=1&issuer=mso&tenant=consumers&ui_locales=pl-PL&client_info=1&epct=PAQABDgEAAABVrSpeuWamRam2jAF1XRQEIGMszrvzXw6yB451j7n-7u5h7R0lYw1gJlFfgdBKs4_rKxbGoC-9EVf5PmGB16mk6dQz02ffeJrNehLWKVNR5Q7qzfULybER82gVoTIw0EeBK1mPeQXJhjKYPfrHFEBS-3WCokcrdBOFXoLtV77Inn0fNdizLOEqRsPK6HRWcSn5eFWVnJpcHaEOeYgCDaIaw8Eqq1nHnUZDJUnhgN-TpyAA&jshs=0&claims=%7b%22compact%22%3a%7b%22name%22%3a%7b%22essential%22%3atrue%7d%7d%7d#" },
    { name: "Yahoo", url: "yahoo.com", logo: "https://www.yahoo.com/favicon.ico", login: "https://login.yahoo.com/" },
    { name: "Spotify", url: "spotify.com", logo: "https://www.spotify.com/favicon.ico", login:"https://accounts.spotify.com/pl/login" },
    { name: "Twitch", url: "twitch.tv", logo: "https://www.twitch.tv/favicon.ico", login: "https://www.twitch.tv/login" },
    { name: "Discord", url: "discord.com", logo: "https://www.discord.com/favicon.ico", login: "https://discord.com/login" },
    { name: "GitHub", url: "github.com", logo: "https://www.github.com/favicon.ico", login: "https://github.com/login" },
    { name: "Dropbox", url: "dropbox.com", logo: "https://www.dropbox.com/favicon.ico", login:"https://www.dropbox.com/login" },
    { name: "Slack", url: "slack.com", logo: "https://www.slack.com/favicon.ico", login:"https://slack.com/signin?entry_point=nav_menu#/signin" },
    { name: "Zoom", url: "zoom.us", logo: "https://www.zoom.us/favicon.ico", login: "https://www.zoom.us/signin#/login" },
    { name: "Apple", url: "apple.com", logo: "https://www.apple.com/favicon.ico", login: "https://secure6.store.apple.com/shop/signIn?ssi=1AAABlerrWX0gfXXPSb7JAySye0lgbVAAGZL32OLL3ybOMXLz9rOYC5sAAAAYaHR0cHM6Ly93d3cuYXBwbGUuY29tL3x8AAIBjgb7_ARcp7VnWhHyRW1cACp-guvgMlPrNS6Q_9v3BQw" },
    { name: "Adobe", url: "adobe.com", logo: "https://www.adobe.com/favicon.ico", login: "https://auth.services.adobe.com/en_US/index.html?callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fadobeid%2Fhomepage_milo%2FAdobeID%2Ftoken%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.adobe.com%252Fhome%2523old_hash%253D%2526from_ims%253Dtrue%253Fclient_id%253Dhomepage_milo%2526api%253Dauthorize%2526scope%253DAdobeID%252Copenid%252Cgnav%252Cpps.read%252Cfirefly_api%252Cadditional_info.roles%252Cread_organizations%252Caccount_cluster.read%26state%3D%257B%2522jslibver%2522%253A%2522v2-v0.45.0-8-gd14e654%2522%252C%2522nonce%2522%253A%25223282571029275152%2522%257D%26code_challenge_method%3Dplain%26use_ms_for_expiry%3Dtrue&client_id=homepage_milo&scope=AdobeID%2Copenid%2Cgnav%2Cpps.read%2Cfirefly_api%2Cadditional_info.roles%2Cread_organizations%2Caccount_cluster.read&state=%7B%22jslibver%22%3A%22v2-v0.45.0-8-gd14e654%22%2C%22nonce%22%3A%223282571029275152%22%7D&relay=8c0e5a25-49e1-4e76-8cbe-fb5b02e105ec&locale=en_US&flow_type=token&idp_flow_type=login&s_p=google%2Cfacebook%2Capple%2Cmicrosoft%2Cline%2Ckakao&response_type=token&code_challenge_method=plain&redirect_uri=https%3A%2F%2Fwww.adobe.com%2Fhome%23old_hash%3D%26from_ims%3Dtrue%3Fclient_id%3Dhomepage_milo%26api%3Dauthorize%26scope%3DAdobeID%2Copenid%2Cgnav%2Cpps.read%2Cfirefly_api%2Cadditional_info.roles%2Cread_organizations%2Caccount_cluster.read&use_ms_for_expiry=true#/" },
    { name: "Trello", url: "trello.com", logo: "https://www.trello.com/favicon.ico", login: "https://id.atlassian.com/login" },
    { name: "Canva", url: "canva.com", logo: "https://www.canva.com/favicon.ico" },
    { name: "Figma", url: "figma.com", logo: "https://www.figma.com/favicon.ico", login: "https://www.figma.com/login" },
    { name: "Booking.com", url: "booking.com", logo: "https://www.booking.com/favicon.ico", login: "https://account.booking.com/sign-in" },
    { name: "Airbnb", url: "airbnb.com", logo: "https://www.airbnb.com/favicon.ico" },
    { name: "Uber", url: "uber.com", logo: "https://www.uber.com/favicon.ico", login: "https://auth.uber.com/v2" },
    { name: "Steam", url: "https://store.steampowered.com", logo: "https://store.steampowered.com/favicon.ico", login: "https://store.steampowered.com/login/" },
    { name: "Vimeo", url: "vimeo.com", logo: "https://www.vimeo.com/favicon.ico", login: "https://vimeo.com/log_in" },
    { name: "SoundCloud", url: "soundcloud.com", logo: "https://www.soundcloud.com/favicon.ico", login: "https://soundcloud.com/signin" },
    { name: "Hulu", url: "hulu.com", logo: "https://www.hulu.com/favicon.ico", login: "https://auth.hulu.com/web/login/enter-email" },
    { name: "Disney+", url: "disneyplus.com", logo: "https://www.disneyplus.com/favicon.ico", login:"https://www.disneyplus.com/identity/login/enter-email" },
    { name: "HBO Max", url: "hbomax.com", logo: "https://www.hbomax.com/favicon.ico", login: "https://auth.max.com/login" },
    { name: "Etsy", url: "etsy.com", logo: "https://www.etsy.com/favicon.ico", login: "https://www.etsy.com/signin" },
    { name: "Walmart", url: "walmart.com", logo: "https://www.walmart.com/favicon.ico", login: "https://identity.walmart.com/account/login?client_id=5f3fb121-076a-45f6-9587-249f0bc160ff&redirect_uri=https%3A%2F%2Fwww.walmart.com%2Faccount%2FverifyToken&scope=openid+email+offline_access&tenant_id=elh9ie&state=%2F&code_challenge=8xlMBMSpCLeUPu_vxNUghsCFRWv1rfkd6MaTO3YPMck" },
    { name: "Target", url: "target.com", logo: "https://www.target.com/favicon.ico", login: "https://www.target.com/login?client_id=ecom-web-1.0.0&ui_namespace=ui-default&back_button_action=browser&keep_me_signed_in=true&kmsi_default=false&actions=create_session_signin" },
    { name: "Shopify", url: "shopify.com", logo: "https://www.shopify.com/favicon.ico", login: "https://accounts.shopify.com/lookup" },
    { name: "Patreon", url: "patreon.com", logo: "https://www.patreon.com/favicon.ico", login: "https://www.patreon.com/login" },
    { name: "Medium", url: "medium.com", logo: "https://www.medium.com/favicon.ico" },
    { name: "Notion", url: "notion.so", logo: "https://www.notion.so/favicon.ico", login: "https://www.notion.so/login" },
    { name: "Asana", url: "asana.com", logo: "https://www.asana.com/favicon.ico", login: "https://app.asana.com/-/login" },
    { name: "Evernote", url: "evernote.com", logo: "https://www.evernote.com/favicon.ico", login: "https://accounts.evernote.com/login" },
    { name: "Dribbble", url: "dribbble.com", logo: "https://www.dribbble.com/favicon.ico", login: "https://dribbble.com/session/new" },
    { name: "Behance", url: "behance.net", logo: "https://www.behance.net/favicon.ico", login: "https://auth.services.adobe.com/pl_PL/index.html?callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fadobeid%2FBehanceWebSusi1%2FAdobeID%2Ftoken%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.behance.net%252F%253Fisa0%253D1%2523old_hash%253D%2526from_ims%253Dtrue%2526client_id%253DBehanceWebSusi1%2526api%253Dauthorize%2526scope%253DAdobeID%252Copenid%252Cgnav%252Csao.cce_private%252Ccreative_cloud%252Ccreative_sdk%252Cbe.pro2.external_client%252Cadditional_info.roles%26state%3D%257B%2522ac%2522%253A%2522behance.net%2522%252C%2522csrf%2522%253A%2522746bda7b-3741-4025-9531-e5e286b9c171%2522%252C%2522context%2522%253A%257B%2522intent%2522%253A%2522signIn%2522%257D%252C%2522jslibver%2522%253A%2522v2-v0.46.0-19-g35c1ff9%2522%252C%2522nonce%2522%253A%25223683984096167957%2522%257D%26code_challenge_method%3Dplain%26use_ms_for_expiry%3Dtrue&client_id=BehanceWebSusi1&scope=AdobeID%2Copenid%2Cgnav%2Csao.cce_private%2Ccreative_cloud%2Ccreative_sdk%2Cbe.pro2.external_client%2Cadditional_info.roles&state=%7B%22ac%22%3A%22behance.net%22%2C%22csrf%22%3A%22746bda7b-3741-4025-9531-e5e286b9c171%22%2C%22context%22%3A%7B%22intent%22%3A%22signIn%22%7D%2C%22jslibver%22%3A%22v2-v0.46.0-19-g35c1ff9%22%2C%22nonce%22%3A%223683984096167957%22%7D&relay=09516eae-2aec-4bf3-a065-8aba5ec34fef&locale=pl_PL&flow_type=token&dctx_id=bhnc_22989526-955d-49e3-9a7d-f093e8f3dbf5&idp_flow_type=login&s_p=google%2Cfacebook%2Capple%2Cmicrosoft%2Cline%2Ckakao&response_type=token&code_challenge_method=plain&redirect_uri=https%3A%2F%2Fwww.behance.net%2F%3Fisa0%3D1%23old_hash%3D%26from_ims%3Dtrue%26client_id%3DBehanceWebSusi1%26api%3Dauthorize%26scope%3DAdobeID%2Copenid%2Cgnav%2Csao.cce_private%2Ccreative_cloud%2Ccreative_sdk%2Cbe.pro2.external_client%2Cadditional_info.roles&use_ms_for_expiry=true#/" },
    { name: "Snapchat", url: "snapchat.com", logo: "https://www.snapchat.com/favicon.ico", login: "https://www.snapchat.com/" },
    { name: "Quora", url: "quora.com", logo: "https://www.quora.com/favicon.ico", login: "https://pl.quora.com/" },
    { name: "Tumblr", url: "tumblr.com", logo: "https://www.tumblr.com/favicon.ico", login: "https://www.tumblr.com/login" },
    { name: "WordPress", url: "wordpress.com", logo: "https://www.wordpress.com/favicon.ico", login: "https://wordpress.com/log-in/" },
    { name: "Squarespace", url: "squarespace.com", logo: "https://www.squarespace.com/favicon.ico", login: "https://login.squarespace.com/" },
    { name: "Wix", url: "wix.com", logo: "https://www.wix.com/favicon.ico", login: "https://users.wix.com/signin" },
    { name: "Coursera", url: "coursera.org", logo: "https://www.coursera.org/favicon.ico", login: "https://www.coursera.org/?authMode=login" },
    { name: "Udemy", url: "udemy.com", logo: "https://www.udemy.com/favicon.ico", login: "https://www.udemy.com/join/passwordless-auth" },
    { name: "Khan Academy", url: "khanacademy.org", logo: "https://www.khanacademy.org/favicon.ico", login: "https://www.khanacademy.org/login" },
    { name: "Duolingo", url: "duolingo.com", logo: "https://www.duolingo.com/favicon.ico", login: "https://www.duolingo.com/?isLoggingIn=true" },
    { name: "Binance", url: "binance.com", logo: "https://www.binance.com/favicon.ico", login: "https://accounts.binance.com/pl/login" },
    { name: "Coinbase", url: "coinbase.com", logo: "https://www.coinbase.com/favicon.ico", login: "https://login.coinbase.com/signin" },
    { name: "Stripe", url: "stripe.com", logo: "https://www.stripe.com/favicon.ico", login: "https://dashboard.stripe.com/login" },
    { name: "Venmo", url: "venmo.com", logo: "https://www.venmo.com/favicon.ico", login: "https://id.venmo.com/signin" },
    { name: "TripAdvisor", url: "tripadvisor.com", logo: "https://www.tripadvisor.com/favicon.ico" },
    { name: "Expedia", url: "expedia.com", logo: "https://www.expedia.com/favicon.ico", login: "https://www.expedia.com/login" },
    { name: "Reddit", url: "reddit.com", logo: "https://www.reddit.com/favicon.ico", login: "https://www.reddit.com/login/" },
    { name: "BBC", url: "bbc.com", logo: "https://www.bbc.com/favicon.ico", login: "https://account.bbc.com/auth" },
    { name: "CNN", url: "cnn.com", logo: "https://www.cnn.com/favicon.ico", login: "https://edition.cnn.com/account/log-in" },
    { name: "int", url: "int.pl", logo: "https://poczta.iplsc.com/n/public/images/skins/int/favicons/favicon.ico", login: "https://int.pl/#/login-clear" },
  ];

  export const findIconUrl = (input: string): string => {
    // Usuń spacje i zmień na małe litery dla niewrażliwości na wielkość liter
    const normalizedInput = extractDomain(input.replace(/\s+/g, "").toLowerCase());
    
    // Znajdź pasującą platformę na podstawie nazwy lub URL
    const matchedPlatform = platforms.find((platform) => {
      const normalizedName = platform.name.replace(/\s+/g, "").toLowerCase();
      const normalizedUrl = platform.url.replace(/\s+/g, "").toLowerCase();
      return normalizedName.includes(normalizedInput) || normalizedUrl.includes(normalizedInput);
    });
  
    // Zwróć URL ikony lub domyślną ikonę, jeśli nie znaleziono
    return matchedPlatform ? matchedPlatform.logo : "";
  };

  export function extractDomain(url: string): string {
    let domain = url.replace(/^(https?:\/\/)?/i, '');
    
    domain = domain.split('/')[0];
    domain = domain.split('?')[0].split('#')[0];
    domain = domain.replace(/^www\./i, '');

    const parts = domain.split('.');
    if (parts.length > 2) {
        domain = parts.slice(-2).join('.');
    }

    return domain;
}

export function getLoginUrl(url: string): string  { 

    // Usuń spacje i zmień na małe litery dla niewrażliwości na wielkość liter
    const normalizedInput = extractDomain(url.replace(/\s+/g, "").toLowerCase());
    
    // Znajdź pasującą platformę na podstawie nazwy lub URL
    const matchedPlatform = platforms.find((platform) => {
      const normalizedName = platform.name.replace(/\s+/g, "").toLowerCase();
      const normalizedUrl = platform.url.replace(/\s+/g, "").toLowerCase();
      return normalizedName.includes(normalizedInput) || normalizedUrl.includes(normalizedInput);
    });
  
    // Zwróć URL ikony lub domyślną ikonę, jeśli nie znaleziono
    return matchedPlatform ? addHttps(matchedPlatform.login ?? url) : url;
}

const addHttps = (url: string | null): string => {
  if (!url) return "";
  if (url.includes("https://")) return url;
  if (url.includes("http://")) return url;
  return "https://" + url;
};
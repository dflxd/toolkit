var cs = {
  language: "cs",
  label1: "Nastavení",
  label2: "Nápověda",
  label3: "Zpět na úvodní stránku",
  label4: "Subnetting",
  label5: "Počet podsítí",
  label6: "IP Adresa",
  label7: "Prefix",
  label8: "(2-14)",
  label9: "(0-28)",
  label10: "Předvolby nastavení",
  label11: "začátečník",
  label12: "192.0.2.0",
  label13: "prefix /24",
  label14: "2-3 podsítě",
  label15: "průměrný",
  label16: "192.0.2.0",
  label17: "prefix /24",
  label18: "4-6 podsítí",
  label19: "pokročilý",
  label20: "192.0.2.?",
  label21: "prefix /24 - /26",
  label22: "4-8 podsítí",
  label23: "expert",
  label24: "náhodná IP",
  label25: "prefix /22 - /26",
  label26: "4-8 podsítí",
  label27: "(náhodná)",
  label28: "Další nastavení",
  label29: "Kategorie pro počítání:",
  label30: "Adresa",
  label31: "Broadcast",
  label32: "Prefix",
  label33: "První host",
  label34: "Poslední host",
  label35: "Maska",
  label36: "Rezervní počet hostů:",
  label37: "Rezervu zaokrouhlujte dolů",
  label38: "bez rezervy",
  label39: "Generovat ze seedu:",
  label40: "Stejný seed a nastavení = stejný příklad",
  label41: "Animace:",
  label42: "Zapnuto",
  label43: "Vypnuto",
  label44: "resetovat nastavení",
  label45: "Módy",
  label46: "Určení adresy",
  label47: "Na základě známé adresy dopočítejte některou další adresu ve stejné podsíti",
  label48: "Stejná podsíť",
  label49: "Zjistěte, zda jsou dvě vygenerované adresy",
  label50: "součástí stejné podsítě",
  label51: "Prefix",
  label52: "Další nastavení",
  label53: "Módy",
  label54: "Nový příklad",
  label55: "Pokračovat v řešení",
  label56: "Změnit zadání",
  label57: "Subnetting",
  label58: "Rozdělte síť s adresou",
  label59: "K dispozici až",
  label60: "adres",
  label61: "Adresa",
  label62: "Maska",
  label63: "na podsítě podle následujícího schématu",
  label64: "a k podsíťím přidejte rezervu",
  label65: "Název",
  label66: "Počet hostů",
  label67: "Zadaná",
  label68: "Zadaný",
  label69: "Adresa",
  label70: "První host",
  label71: "Poslední host",
  label72: "Broadcast",
  label73: "Maska",
  label74: "Prefix",
  label75: "správně",
  label76: "bez rezervy",
  label77: "vyplnit všechna pole",
  label78: "Zkontrolovat",
  label79: "Zobrazit řešení",
  label80: "Nový příklad",
  label81: "Subnetting - Určení adresy",
  label82: "příklad",
  label83: "Prefix",
  label84: "Jaká je adresa",
  label85: "Správně",
  label86: "Zkontrolovat",
  label87: "Zobrazit řešení",
  label88: "Nový příklad",
  label89: "Subnetting - Stejná podsíť",
  label90: "příklad",
  label91: "Adresa 1",
  label92: "Adresa 2",
  label93: "Prefix",
  label94: "Patří tyto dvě adresy do stejné podsítě?",
  label95: "ANO",
  label96: "NE",
  label97: "Zkontrolovat",
  label98: "Nový příklad",
  label99: "Příklad",
  label100: "(náhodně)",
  label101: "přejít na",
  label102: "Střední škola informatiky",
  label103: "a finančních služeb, Plzeň",
  label104: "",
  help: `<div>
    <div class='title'>Pokyny pro počítání podsítí</div>
<div class="warning">
    <i class='fas fa-info'></i><span>Toto jsou pouze zjednodušená pravidla. V praxi může do počítání vstupovat více faktorů.</span>
</div>
    <div class="highlighted">jak postupovat</div>
    <ul class="noIndent">
      <li>Podsítě jsou co možná nejmenší vzhledem k požadovanému počtu hostů</li>
      <li>Podsítě se řadí podle velikosti od největší po nejmenší</li>
      <li>Pokud má více podsítí stejnou velikost, řadí se abecedně podle názvu</li>
      <li>Podsítě navazují hned za sebou</li>
    </ul>
    <div class="highlighted">určení adres a prefixů</div>
    <ul>
      <li>
      <b>Zjistíme prefix (velikost) všech podsítí.</b> Podle toho budeme moct stanovit jejich pořadí. U každé podsítě přičteme k požadovanému počtu hostů ještě 2 adresy (adresu a broadcast podsítě) a určíme kolik je pro podsíť potřeba bitů.
      <hr>
      Například pro 8 hostů potřebujeme 10 adres, zvolíme tedy 4 bity (až&nbsp;16&nbsp;adres). 3 bity (8&nbsp;adres) by nestačily kvůli 2 speciálním adresám a 5 bitů (32&nbsp;adres) je zbytečně moc.
      </li>
      <li><b>Celou adresu rozdělíme na část adresy podsítě a část pro hosty.</b> Na část pro hosty v našem příkladu potřebujeme 4 bity. Na část adresy podsítě poté zbyde 28 z celkových 32 bitů v adrese. A to je prefix - /28</li>
        <div class='helper'>
            <table>
              <tr>
                <td class="right">192 . 0 . 2 . 0000</td><td class="divider"><span>|</span></td><td>0000<span class="prefix">/28</span></td>
              </tr>
              <tr>
                <td class='smaller right'>část adresy podsítě</td><td class="divider"><span>|</span></td><td class='smaller'>část pro hosty</td>
              </tr>
            </table>

        </div>

      <li>Vybereme podsíť podle pravidel výše. Dopočítáme jednotlivé adresy v podsíti:
        <hr>
        <ul>
      <li><b>Adresou podsítě</b> je první adresa v podsíti (v části pro hosty binárně samé 0)</li>

      <li><b>První použitelnou adresou</b> (první host) je druhá adresa v podsíti (v části pro hosty binárně samé 0 a poslední bit 1)</li>


      <li><b>Poslední použitelnou adresou</b> (poslední host) je předposlední adresa v podsíti (v části pro hosty binárně samé 1 a poslední bit 0)</li>

      <li><b>Broadcastem podsítě</b> je poslední adresa v podsíti (v části pro hosty binárně samé 1)</li>
      </ul>
      <li>
        Opakujeme předchozí krok, dokud nevyčerpáme všechny podsítě.

      </li>
      </li>
      </ul>
        <div class="highlighted">příklad podsítí</div>
        <ul>
      <li>
        Máme síť 192.0.2.0/24. Příklad první podsítě, prefix /28, poslední oktet binárně:
      </li>
      <div class='helper middlePadding'>

          <table>
            <tr>
              <td class='smaller'>adresa podsítě</td>
              <td>192 . 0 . 2 . 0000 | 0000</td>
            </tr>
            <tr>
              <td class='smaller'>první použitelná adresa</td>
              <td>192 . 0 . 2 . 0000 | 0001</td>
            </tr>
            <tr>
              <td class='smaller'>poslední použitelná adresa</td>
              <td>192 . 0 . 2 . 0000 | 1110</td>
            </tr>
            <tr>
              <td class='smaller'>adresa broadcastu</td>
              <td>192 . 0 . 2 . 0000 | 1111</td>
            </tr>
          </table>

      </div>
      <li>Příklad další možné podsítě, taky prefix /28:</li>
      <div class='helper middlePadding'>

          <table>
            <tr>
              <td class='smaller'>adresa podsítě</td>
              <td>192 . 0 . 2 . 0001 | 0000</td>
            </tr>
            <tr>
              <td class='smaller'>první použitelná adresa</td>
              <td>192 . 0 . 2 . 0001 | 0001</td>
            </tr>
            <tr>
              <td style='letter-spacing:5px;font-weight:bold'>...</td>
            </tr>
          </table>

      </div>
      <li>
        A tak dále
      </li>
    </ul>


  </div>`

}

var en = {
  language: "en",
  label1: "Settings",
  label2: "Help",
  label3: "Back to homepage",
  label4: "Subnetting",
  label5: "Subnet count",
  label6: "IP Address",
  label7: "Prefix",
  label8: "(2-14)",
  label9: "(0-28)",
  label10: "Settings presets",
  label11: "beginner",
  label12: "192.0.2.0",
  label13: "prefix /24",
  label14: "2-3 subnets",
  label15: "intermediate",
  label16: "192.0.2.0",
  label17: "prefix /24",
  label18: "4-6 subnets",
  label19: "advanced",
  label20: "192.0.2.?",
  label21: "prefix /24 - /26",
  label22: "4-8 subnets",
  label23: "expert",
  label24: "random IP",
  label25: "prefix /22 - /26",
  label26: "4-8 subnets",
  label27: "(random)",
  label28: "Additional settings",
  label29: "Categories to calculate:",
  label30: "Address",
  label31: "Broadcast",
  label32: "Prefix",
  label33: "First host",
  label34: "Last host",
  label35: "Mask",
  label36: "Reserve space:",
  label37: "Round the reserve space down",
  label38: "no reserve",
  label39: "Generate from seed:",
  label40: "Same seed and settings = same exercise",
  label41: "Animations:",
  label42: "On",
  label43: "Off",
  label44: "reset settings",
  label45: "Mods",
  label46: "Address determination",
  label47: "Calculate the required address based on some other known address in the subnet",
  label48: "Same subnet",
  label49: "Find out, whether two generated addresses ",
  label50: "belong to the same subnet",
  label51: "Prefix",
  label52: "Additional settings",
  label53: "Mods",
  label54: "New exercise",
  label55: "Continue",
  label56: "Change settings",
  label57: "Subnetting",
  label58: "Divide network with address",
  label59: "Up to",
  label60: "addresses available",
  label61: "Address",
  label62: "Mask",
  label63: "into subnets by the following diagram",
  label64: "and add a reserve space of",
  label65: "Name",
  label66: "Host count",
  label67: "Entered",
  label68: "Entered",
  label69: "Address",
  label70: "First host",
  label71: "Last host",
  label72: "Broadcast",
  label73: "Mask",
  label74: "Prefix",
  label75: "(correct)",
  label76: "no reserve",
  label77: "fill all fields",
  label78: "Check",
  label79: "Show right answers",
  label80: "New exercise",
  label81: "Subnetting - Address determination",
  label82: "exercise",
  label83: "Prefix",
  label84: "What is the",
  label85: "Correct",
  label86: "Check",
  label87: "Show right answer",
  label88: "New exercise",
  label89: "Subnetting - Same subnet",
  label90: "exercise",
  label91: "Address 1",
  label92: "Address 2",
  label93: "Prefix",
  label94: "Are these two addresses<br>located within the same subnet?",

  label95: "YES",
  label96: "NO",
  label97: "Check",
  label98: "New exercise",
  label99: "Exercise",
  label100: "(random)",
  label101: "jump to",
  label102: "Secondary school of informatics",
  label103: "and financial services, Pilsen",
  label104: " address",
  help: `<div>
    <div class='title'>Instructions for calculating subnets</div>
<div class="warning">
    <i class='fas fa-info'></i><span>These rules are simplified. In practice, several factors can alter the calculations.</span>
</div>
    <div class="highlighted">how to proceed</div>
    <ul class="noIndent">
      <li>Subnets are as small as possible while fullfiling the required number of hosts</li>
      <li>Subnets order is determined by their size - from biggest to smallest</li>
      <li>If there are more subnets with the same size, they are ordered alphabetically by name</li>
      <li>Subnets are placed right behind each other</li>
    </ul>
    <div class="highlighted">address and prefix determination</div>
    <ul>
      <li>
      <b>Identify the prefix (size) of all subnets.</b> That tells us how to order them later. To every subnet we add 2 more addresses (address and broadcast of the subnet) and then we determine how many bits are needed.
      <hr>
      For example for 8 hosts subnet we need 10 addresses and therefore we need 4 bits (up to 16 addresses). 3 bits (8 addresses) wouldn’t be enough because of the 2 special addresses and 5 bits (32 addresses) is unnecessary waste of space.
      </li>
      <li><b>Divide whole address into subnet address part and hosts part.</b> In our example we need 4 bits for the hosts part. So for the subnet address part we're left with 28 out of 32 bits in the whole address. And that’s the prefix - /28</li>
        <div class='helper'>
            <table>
              <tr>
                <td class="right">192 . 0 . 2 . 0000</td><td class="divider"><span>|</span></td><td>0000<span class="prefix">/28</span></td>
              </tr>
              <tr>
                <td class='smaller right'>subnet address part</td><td class="divider"><span>|</span></td><td class='smaller'>hosts part</td>
              </tr>
            </table>

        </div>

      <li>Select a subnet using the rules above. Then calculate all the needed addresses:
        <hr>
        <ul>
      <li><b>Subnet address</b> is the first address in a subnet (in hosts part binary all 0)</li>

      <li><b>First available address</b> (first host) is the second address in a subnet (in hosts part binary all 0 and the last bit 1)</li>


      <li><b>Last available address</b> (last host) is the second from end address in a subnet  (in hosts part binary all 1 and the last bit 0)</li>

      <li><b>Subnet broadcast</b> is the last address in a subnet (in hosts part binary all 1)</li>
      </ul>
      <li>
        Repeat the last step until there are no subnets remaining.

      </li>
      </li>
      </ul>
      <div class="highlighted">subnets example</div>
      <ul>
      <li>
        Possible first subnet of network 192.0.2.0/24, subnet's prefix /28, last octet binary:
      </li>
      <div class='helper middlePadding'>

          <table>
            <tr>
              <td class='smaller'>subnet address</td>
              <td>192 . 0 . 2 . 0000 | 0000</td>
            </tr>
            <tr>
              <td class='smaller'>first available address</td>
              <td>192 . 0 . 2 . 0000 | 0001</td>
            </tr>
            <tr>
              <td class='smaller'>last available address</td>
              <td>192 . 0 . 2 . 0000 | 1110</td>
            </tr>
            <tr>
              <td class='smaller'>broadcast address</td>
              <td>192 . 0 . 2 . 0000 | 1111</td>
            </tr>
          </table>

      </div>
      <li>Possible next subnet, also prefix /28:</li>
      <div class='helper middlePadding'>

          <table>
            <tr>
              <td class='smaller'>subnet address</td>
              <td>192 . 0 . 2 . 0001 | 0000</td>
            </tr>
            <tr>
              <td class='smaller'>first available address</td>
              <td>192 . 0 . 2 . 0001 | 0001</td>
            </tr>
            <tr>
              <td style='letter-spacing:5px;font-weight:bold'>...</td>
            </tr>
          </table>

      </div>
      <li>
        And so on
      </li>
    </ul>


  </div>`
}

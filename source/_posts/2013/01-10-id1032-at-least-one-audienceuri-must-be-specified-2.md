---
title: 'ID1032: At least one audienceUri must be specified'
id: 1928
tags:
  - Federation
  - WCF
  - WIF
date: 2013-01-10T11:57:04.000Z
author: Fabian Wetzel
---

**Problem:** <p>ID1032: At least one 'audienceUri' must be specified in the SamlSecurityTokenRequirement when the AudienceUriMode is set to 'Always' or 'BearerKeyOnly'. Either add the valid URI values to the AudienceUris property of SamlSecurityTokenRequirement, or turn off checking by specifying an AudienceUriMode of 'Never' on the SamlSecurityTokenRequirement. <p>**Context:** <p>I have an active STS implemented which can happily issue tokens but throws the quoted exception in case of issuing ActAs-tokens. <p>**Solution:** <p>I had to add the AudienceUris section to the ActAs handler section:
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">microsoft.identityModel</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">service</span> <span class="attr">saveBootstrapTokens</span><span class="kwrd">="true"</span><span class="kwrd">&gt;</span>
...
      <span class="rem">&lt;!--An ActAs handlers will be required to support delegation --&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">securityTokenHandlers</span> <span class="attr">name</span><span class="kwrd">="ActAs"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">securityTokenHandlerConfiguration</span> <span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">audienceUris</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">value</span><span class="kwrd">="https://localhost/..."</span> <span class="kwrd">/&gt;</span>
          <span class="kwrd">&lt;/</span><span class="html">audienceUris</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">issuerNameRegistry</span> <span class="attr">type</span><span class="kwrd">="Microsoft.IdentityModel.Tokens.ConfigurationBasedIssuerNameRegistry, Microsoft.IdentityModel, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">trustedIssuers</span><span class="kwrd">&gt;</span>
              <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">thumbprint</span><span class="kwrd">="123efg1231231232abc"</span> <span class="attr">name</span><span class="kwrd">="ABCD.Auth.FederationProvider"</span> <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">trustedIssuers</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;/</span><span class="html">issuerNameRegistry</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">securityTokenHandlerConfiguration</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">type</span><span class="kwrd">="Microsoft.IdentityModel.Tokens.Saml11.Saml11SecurityTokenHandler, Microsoft.IdentityModel, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"</span> <span class="kwrd">/&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">securityTokenHandlers</span><span class="kwrd">&gt;</span></pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>

<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>

